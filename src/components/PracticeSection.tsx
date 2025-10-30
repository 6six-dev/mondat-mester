import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const exampleSentences = [
  {
    sentence: "Esik az eső, és fúj a szél.",
    type: "mellérendelő",
    subtype: "kapcsolatos",
    explanation: "A két tagmondat egyenrangú, 'és' kötőszóval kapcsolódnak."
  },
  {
    sentence: "Szeretnék menni, de nincs időm.",
    type: "mellérendelő",
    subtype: "ellentétes",
    explanation: "A 'de' kötőszó ellentétet fejez ki a két egyenrangú tagmondat között."
  },
  {
    sentence: "Azt mondta, hogy holnap jön.",
    type: "alárendelő",
    subtype: "tárgyi",
    explanation: "A 'hogy' kötőszóval kezdődő mellékmondat a főmondat tárgyaként működik.",
    mainClause: "Azt mondta",
    subordinateClause: "hogy holnap jön"
  },
  {
    sentence: "Amikor hazaértem, már sötét volt.",
    type: "alárendelő",
    subtype: "időhatározói",
    explanation: "Az 'amikor' kötőszóval kezdődő mellékmondat időbeli viszonyt fejez ki.",
    mainClause: "már sötét volt",
    subordinateClause: "Amikor hazaértem"
  },
  {
    sentence: "A könyv, amelyet tegnap olvastam, nagyon érdekes volt.",
    type: "alárendelő",
    subtype: "jelzői",
    explanation: "Az 'amelyet' vonatkozó névmással kezdődő mellékmondat a főnevet jellemzi.",
    mainClause: "A könyv nagyon érdekes volt",
    subordinateClause: "amelyet tegnap olvastam"
  },
  {
    sentence: "Gyere el, vagy maradj otthon.",
    type: "mellérendelő",
    subtype: "választó",
    explanation: "A 'vagy' kötőszó választási lehetőséget fejez ki a két tagmondat között."
  },
  {
    sentence: "Nem mentem el, mert beteg voltam.",
    type: "mellérendelő",
    subtype: "okhatározói",
    explanation: "A 'mert' kötőszó indoklást fejez ki, mellérendelő viszonyban."
  },
  {
    sentence: "Ha esik, otthon maradok.",
    type: "alárendelő",
    subtype: "feltételes",
    explanation: "A 'ha' kötőszóval kezdődő mellékmondat feltételt fejez ki.",
    mainClause: "otthon maradok",
    subordinateClause: "Ha esik"
  }
];

const PracticeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const currentExample = exampleSentences[currentIndex];

  const handleNewSentence = () => {
    setCurrentIndex((prev) => (prev + 1) % exampleSentences.length);
    setRevealed(false);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
        Gyakorlás példamondatokkal
      </h2>

      <Card className="p-8 shadow-xl">
        <div className="mb-6">
          <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
            <p className="text-2xl leading-relaxed text-foreground font-medium">
              {currentExample.sentence}
            </p>
          </div>
        </div>

        {!revealed ? (
          <Button
            onClick={() => setRevealed(true)}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            Megoldás megtekintése
          </Button>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-secondary/10 p-6 rounded-lg border-2 border-secondary/30">
              <h3 className="text-xl font-bold mb-2 text-secondary">
                Típus: {currentExample.type.charAt(0).toUpperCase() + currentExample.type.slice(1)} mondat
              </h3>
              <p className="text-lg mb-2 text-foreground">
                <strong>Altípus:</strong> {currentExample.subtype}
              </p>
              <p className="text-base text-muted-foreground mb-3">
                {currentExample.explanation}
              </p>
              
              {currentExample.type === 'alárendelő' && currentExample.mainClause && currentExample.subordinateClause && (
                <div className="mt-4 space-y-3">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-1">Főmondat:</p>
                    <p className="text-base text-foreground">{currentExample.mainClause}</p>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <p className="text-sm font-semibold text-accent mb-1">Mellékmondat:</p>
                    <p className="text-base text-foreground">{currentExample.subordinateClause}</p>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleNewSentence}
              size="lg"
              variant="outline"
              className="w-full text-lg font-semibold"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Új példamondat
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
};

export default PracticeSection;
