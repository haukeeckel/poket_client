import { XCircleIcon } from '@heroicons/react/solid';

function AuthError({ errMessage }) {
  return (
    <div className="flex justify-center bg-red-50 rounded my-2 py-2 text-sm animate-error-shake border-solid border-red-900 border-[1px] opacity-80">
      <XCircleIcon className="h-5 w-5 text-red-400 mr-1" aria-hidden="true" />
      <p className="ml-1 text-sm text-red-700">{errMessage}</p>
    </div>
  );
}

export default AuthError;
