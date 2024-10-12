import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Profile() {
  return (
    <div className="relative mx-4 my-2 font-prompt md:mx-6 md:my-4 lg:mx-12 lg:my-5">
      <Card className="rounded bg-muted-foreground/10 shadow-none">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Change your details</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  className="bg-background"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  className="bg-background"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Address</Label>
                <Input
                  readOnly
                  id="name"
                  value="xxx0xxx0xx00xxxx0xxx0xxx"
                  className="bg-background"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
