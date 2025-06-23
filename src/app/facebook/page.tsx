'use client';
import { useRouter } from "next/navigation";

const Facebook = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push('/');
  };
  return (
    <div>
      <h1>Facebook Page</h1>
      <p>This is the Facebook page content.</p>
      <button onClick={() => handleBtn()}>Click Me!</button>
    </div>
  );
}

export default Facebook;