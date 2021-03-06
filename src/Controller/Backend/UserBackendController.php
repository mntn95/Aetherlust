<?php

namespace App\Controller\Backend;

use App\Entity\User;
use App\Form\UserType;
use App\Form\SearchUserType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/backend/user")
 */
class UserBackendController extends Controller
{
    /**
     * @Route("/page/{page}", name="backend_user_index", requirements={"page" = "\d+"}, defaults={"page" = 1}, methods="GET")
     */
    public function index(UserRepository $userRepository,$page): Response
    {
        $limit = 5; //limite de questions par page (pagination)
        $users = $userRepository->findUserByPage($page,$limit); //requête où on passe la page actuelle, le seeBanned et la limite de questions
        $totalUser =  $userRepository->findCountMax(); //requête qui compte le nombre total de questions avec ou sans les banned
        $pageMax = ceil($totalUser / $limit);
        $form = $this->createForm(SearchUserType::class);
        return $this->render('backend/user/index.html.twig', [
            'users' => $users,
            'page'=>$page,
            'pageMax'=>$pageMax,
            'form' => $form->createView(),
        ]);
    }
        /**
     * @Route("/search", name="back_search_user")
     */
    public function findBakUserBySearch(Request $request)
    {
        $data = $request->request->get('search_user');
        $username = $data['username'];

        $userRepository = $this->getDoctrine()->getRepository(User::class);
        $users = $userRepository->findBySearch($username);

        return $this->render('backend/user/search.html.twig', [
            'users' =>$users,
        ]);
    }

    /**
     * @Route("/{id}", name="backend_user_show", methods="GET")
     */
    public function show(User $user): Response
    {
        return $this->render('backend/user/show.html.twig', ['user' => $user]);
    }

    /**
     * @Route("/{id}/edit", name="backend_user_edit", methods="GET|POST")
     */
    public function edit(Request $request, User $user, UserPasswordEncoderInterface $encoder): Response
    {

        //Dans le cas où l'utilisateur veut modifier son profil mais pas son mot de passe,
        // on récupère son ancien mot de passe
        $oldPassword = $user->getPassword();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Si l'utilisateur n'a pas changé son mot de passe, alors on récupère du nul
            // on passe donc l'ancien mot de passe à encodedPassword
            if(is_null($user->getPassword())){
                $encodedPassword = $oldPassword;
            } else {
                $encodedPassword = $encoder->encodePassword($user, $user->getPassword());
            }
            // Si l'utilisateur a changé son mot de passe, alors il faut l'encoder avant de le sauvegarder en database
            $user->setPassword($encodedPassword);
            $this->getDoctrine()->getManager()->flush();
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('backend_user_index');
        }

        return $this->render('backend/user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="backend_user_delete", methods="DELETE")
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($user);
            $em->flush();
        }

        return $this->redirectToRoute('backend_user_index');
    }

    /**
     * @Route("/{id}/hide", name="backend_user_hide")
     */
    public function hide(User $user)
    {   
        $em = $this->getDoctrine()->getManager();

        if($user->getIsActive() === true) {
            // On passe le statut à false pour que la réponse ne soit plus affichée
            $user->setIsActive(false);
            $em->flush();
        } else {
            // On passe le statut à ftrue pour que la réponse soit affichée
            $user->setIsActive(true);
            $em->flush();
        }
        //On redirige ensuite sur la page de la question où l'on se trouvait
        return $this->redirectToRoute('backend_user_index');
    }
}
