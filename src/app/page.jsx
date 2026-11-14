import PortfolioApp from "@/components/PortfolioApp";
import portfolioData from "@/data/portfolioData";

export default function HomePage() {
  return <PortfolioApp data={portfolioData} />;
}
