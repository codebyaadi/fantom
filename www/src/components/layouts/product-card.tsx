/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RPFMsaHUqZ6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductCard = ({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: string;
}) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <Link href="#" className="block" prefetch={false}>
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={500}
          height={400}
          className="h-64 w-full object-cover"
        />
      </Link>
      <div className="bg-background p-4">
        <div className="mb-2">
          <h3 className="text-xl font-bold">Acme Wireless Headphones</h3>
          <p className="text-muted-foreground">Premium sound quality</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$99.99</span>
          <Button size="sm">Buy Now</Button>
        </div>
      </div>
    </Card>
  );
};
