import ItemDetailsForm from "~/components/ItemDetailsForm";
import { GetProduct } from "~/server/getProduct";

interface TradePageProps {
  params: Promise<{ slug: string }>;
}

export default async function TradeForm({ params }: TradePageProps) {
  const { slug } = await params;
  if (!slug) {
    return;
  }
  const product = await GetProduct(BigInt(slug));

  if (!product) {
    return;
  }

  return <ItemDetailsForm product={product} />;
}
