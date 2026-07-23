import LoginButton from "@/components/LoginButton";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="p-10 border rounded-md max-w-[50%] flex gap-5 flex-col bg-[#3d4b60]">
        <h1 className="text-center font-semibold text-xl">Connexion</h1>
        
        <p className="text-center text-sm text-white-600">
          Veuillez vous connecter avec votre compte professionnel ou personnel Microsoft 
          pour accéder à votre espace de travail et à vos applications.
        </p>
        
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;