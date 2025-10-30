import { Card } from "@/components/ui/card";
import { GitBranch, Link2 } from "lucide-react";

const ExplanationSection = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
        Mi az összetett mondat?
      </h2>
      
      <Card className="p-8 mb-12 shadow-lg">
        <p className="text-xl leading-relaxed text-foreground">
          Az <strong>összetett mondat</strong> két vagy több tagmondatból áll. 
          A tagmondatok kapcsolata lehet <strong>mellérendelő</strong> (egyenrangú) 
          vagy <strong>alárendelő</strong> (egyik függ a másiktól).
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 shadow-lg border-l-4 border-l-secondary">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Link2 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Mellérendelő</h3>
          </div>
          <p className="text-lg leading-relaxed mb-4 text-foreground">
            A tagmondatok egyenrangúak, egyik sem függ a másiktól. 
            Kötőszavak: <strong>és, de, vagy, mert, tehát, azonban</strong>.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-base italic text-foreground">
              Például: "Esik az eső, <strong>és</strong> fúj a szél."
            </p>
          </div>
        </Card>

        <Card className="p-8 shadow-lg border-l-4 border-l-accent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Alárendelő</h3>
          </div>
          <p className="text-lg leading-relaxed mb-4 text-foreground">
            Az egyik tagmondat (mellékmondat) függ a másiktól (főmondat). 
            Kötőszavak: <strong>hogy, amikor, mert, ha, aki, amely, ahol</strong>.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-base italic text-foreground">
              Például: "Azt mondta, <strong>hogy</strong> holnap jön."
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ExplanationSection;
