/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RPFMsaHUqZ6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductCard = ({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: number;
}) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg">
      <Link href="#" className="block" prefetch={false}>
        <Image
          src={image}
          alt="Product Image"
          width={500}
          height={400}
          className="h-64 w-full object-cover object-top"
        />
      </Link>
      <div className="bg-background p-4">
        <div className="mb-2">
          <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
          <p className="text-muted-foreground">Premium sound quality</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${price}</span>
          <Button size="sm" className="rounded-full">Buy Now</Button>
        </div>
      </div>
    </Card>
  );
};
