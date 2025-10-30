import { BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-12 px-4 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Összetett Mondatok
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Fedezd fel az alárendelő és mellérendelő mondatok világát interaktív gyakorlatokkal
        </p>
      </div>
    </section>
  );
};

export default Hero;
