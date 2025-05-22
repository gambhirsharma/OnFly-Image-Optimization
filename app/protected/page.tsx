import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { FileUpload } from '@/components/file-upload'
import Link from "next/link";
// import DisplayUpload from "@/components/DisplayUpload";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12a items-center justify-center min-h-[70vh]">
      <FileUpload />
      <div>
        <p className="text-xl font-semibold text-center">
          Upload your image here, and view all uploaded images at{" "}
          <Link href="/image" className="text-blue-500 underline">/image</Link>
        </p>
      </div>
      {/* <DisplayUpload/> */}
    </div>
  );
}
