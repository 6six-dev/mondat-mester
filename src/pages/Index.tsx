import Hero from "@/components/Hero";
import ExplanationSection from "@/components/ExplanationSection";
import PracticeSection from "@/components/PracticeSection";
import AnalyzerSection from "@/components/AnalyzerSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ExplanationSection />
      <PracticeSection />
      <AnalyzerSection />
      <footer className="py-8 text-center text-muted-foreground">
        <p className="text-base">© 2025 Összetett Mondatok Gyakorló</p>
      </footer>
    </div>
  );
};

export default Index;
