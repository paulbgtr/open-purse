import { getPurseByUsername } from "@/lib/actions/get-purse";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ViewPurse } from "@/components/view-purse";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PursePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const result = await getPurseByUsername(username);

  if (!result.success || !result.purse) {
    notFound();
  }

  const { purse } = result;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <ViewPurse purse={purse} />
      </div>
    </div>
  );
}
