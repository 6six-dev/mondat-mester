import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface AnalysisResult {
  type: string;
  subtype: string;
  explanation: string;
  confidence: string;
  mainClause?: string;
  subordinateClause?: string;
}

const AnalyzerSection = () => {
  const [inputSentence, setInputSentence] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeSentence = () => {
    if (!inputSentence.trim()) {
      toast.error("Kérlek írj be egy mondatot!");
      return;
    }

    const sentence = inputSentence.toLowerCase();
    
    // Alárendelő kötőszavak és típusaik
    const subordinating = {
      'hogy': { type: 'alárendelő', subtype: 'tárgyi', explanation: 'A "hogy" kötőszó tárgyi mellékmondatot vezet be.' },
      'amikor': { type: 'alárendelő', subtype: 'időhatározói', explanation: 'Az "amikor" kötőszó időbeli viszonyt fejez ki.' },
      'mikor': { type: 'alárendelő', subtype: 'időhatározói', explanation: 'A "mikor" kötőszó időbeli viszonyt fejez ki.' },
      'miután': { type: 'alárendelő', subtype: 'időhatározói', explanation: 'A "miután" kötőszó időbeli viszonyt fejez ki.' },
      'mielőtt': { type: 'alárendelő', subtype: 'időhatározói', explanation: 'A "mielőtt" kötőszó időbeli viszonyt fejez ki.' },
      'ha': { type: 'alárendelő', subtype: 'feltételes', explanation: 'A "ha" kötőszó feltételt fejez ki.' },
      'ahol': { type: 'alárendelő', subtype: 'helyhatározói', explanation: 'Az "ahol" vonatkozó névmás helyi viszonyt fejez ki.' },
      'ahonnan': { type: 'alárendelő', subtype: 'helyhatározói', explanation: 'Az "ahonnan" vonatkozó névmás helyi viszonyt fejez ki.' },
      'ahova': { type: 'alárendelő', subtype: 'helyhatározói', explanation: 'Az "ahova" vonatkozó névmás helyi viszonyt fejez ki.' },
      'aki': { type: 'alárendelő', subtype: 'jelzői', explanation: 'Az "aki" vonatkozó névmás jelzői mellékmondatot vezet be.' },
      'amely': { type: 'alárendelő', subtype: 'jelzői', explanation: 'Az "amely" vonatkozó névmás jelzői mellékmondatot vezet be.' },
      'amelyet': { type: 'alárendelő', subtype: 'jelzői', explanation: 'Az "amelyet" vonatkozó névmás jelzői mellékmondatot vezet be.' },
      'mint': { type: 'alárendelő', subtype: 'hasonlító', explanation: 'A "mint" kötőszó hasonlítást fejez ki.' },
      'mintha': { type: 'alárendelő', subtype: 'hasonlító', explanation: 'A "mintha" kötőszó hasonlítást fejez ki.' },
      'hogyha': { type: 'alárendelő', subtype: 'feltételes', explanation: 'A "hogyha" kötőszó feltételt fejez ki.' },
      'míg': { type: 'alárendelő', subtype: 'időhatározói', explanation: 'A "míg" kötőszó időbeli viszonyt fejez ki.' },
      'amíg': { type: 'alárendelő', subtype: 'időhatározói', explanation: 'Az "amíg" kötőszó időbeli viszonyt fejez ki.' },
    };

    // Mellérendelő kötőszavak és típusaik
    const coordinating = {
      'és': { type: 'mellérendelő', subtype: 'kapcsolatos', explanation: 'Az "és" kötőszó egyenrangú tagmondatokat kapcsol össze.' },
      'meg': { type: 'mellérendelő', subtype: 'kapcsolatos', explanation: 'A "meg" kötőszó egyenrangú tagmondatokat kapcsol össze.' },
      'de': { type: 'mellérendelő', subtype: 'ellentétes', explanation: 'A "de" kötőszó ellentétet fejez ki egyenrangú tagmondatok között.' },
      'azonban': { type: 'mellérendelő', subtype: 'ellentétes', explanation: 'A "azonban" kötőszó ellentétet fejez ki.' },
      'viszont': { type: 'mellérendelő', subtype: 'ellentétes', explanation: 'A "viszont" kötőszó ellentétet fejez ki.' },
      'vagy': { type: 'mellérendelő', subtype: 'választó', explanation: 'A "vagy" kötőszó választási lehetőséget fejez ki.' },
      'avagy': { type: 'mellérendelő', subtype: 'választó', explanation: 'Az "avagy" kötőszó választási lehetőséget fejez ki.' },
      'tehát': { type: 'mellérendelő', subtype: 'következtető', explanation: 'A "tehát" kötőszó következtetést fejez ki.' },
      'ezért': { type: 'mellérendelő', subtype: 'következtető', explanation: 'Az "ezért" kötőszó következtetést fejez ki.' },
      'mert': { type: 'mellérendelő', subtype: 'okhatározói', explanation: 'A "mert" kötőszó indoklást fejez ki mellérendelő viszonyban.' },
      'hiszen': { type: 'mellérendelő', subtype: 'okhatározói', explanation: 'A "hiszen" kötőszó indoklást fejez ki.' },
    };

    // Először alárendelő kötőszavakat keresünk (ezek erősebbek)
    for (const [word, data] of Object.entries(subordinating)) {
      if (sentence.includes(word)) {
        // Megkeressük a kötőszó pozícióját
        const conjunctionIndex = sentence.indexOf(word);
        const beforeConjunction = inputSentence.substring(0, conjunctionIndex).trim();
        const fromConjunction = inputSentence.substring(conjunctionIndex).trim();
        
        // Ha a kötőszó a mondat elején van, akkor az első rész a mellékmondat
        let mainClause = '';
        let subordinateClause = '';
        
        if (conjunctionIndex < 10) {
          // A kötőszó a mondat elején van
          const parts = inputSentence.split(',');
          if (parts.length >= 2) {
            subordinateClause = parts[0].trim();
            mainClause = parts.slice(1).join(',').trim();
          } else {
            subordinateClause = fromConjunction;
            mainClause = beforeConjunction || '(implicit főmondat)';
          }
        } else {
          // A kötőszó a mondat közepén/végén van
          mainClause = beforeConjunction;
          subordinateClause = fromConjunction;
        }
        
        setResult({
          type: data.type,
          subtype: data.subtype,
          explanation: data.explanation,
          confidence: 'magas',
          mainClause,
          subordinateClause
        });
        return;
      }
    }

    // Ha nem találtunk alárendelőt, keresünk mellérendelőt
    for (const [word, data] of Object.entries(coordinating)) {
      if (sentence.includes(word)) {
        setResult({
          type: data.type,
          subtype: data.subtype,
          explanation: data.explanation,
          confidence: 'magas'
        });
        return;
      }
    }

    // Ha nem találtunk kötőszót
    setResult({
      type: 'egyszerű',
      subtype: 'alany-állítmány',
      explanation: 'Nem található összetett mondatra utaló kötőszó. Ez valószínűleg egyszerű mondat.',
      confidence: 'közepes'
    });
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
        Mondat elemző
      </h2>

      <Card className="p-8 shadow-xl">
        <div className="space-y-6">
          <div>
            <label className="text-lg font-semibold mb-3 block text-foreground">
              Írd be az elemzendő mondatot:
            </label>
            <Textarea
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              placeholder="Például: Esik az eső, és fúj a szél."
              className="min-h-[120px] text-lg resize-none"
            />
          </div>

          <Button
            onClick={analyzeSentence}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            <Search className="mr-2 h-5 w-5" />
            Mondat elemzése
          </Button>

          {result && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-accent/10 p-6 rounded-lg border-2 border-accent/30">
                <h3 className="text-2xl font-bold mb-3 text-accent">
                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)} mondat
                </h3>
                <p className="text-lg mb-2 text-foreground">
                  <strong>Típus:</strong> {result.subtype}
                </p>
                <p className="text-base text-muted-foreground mb-3">
                  {result.explanation}
                </p>
                
                {result.type === 'alárendelő' && result.mainClause && result.subordinateClause && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <p className="text-sm font-semibold text-primary mb-1">Főmondat:</p>
                      <p className="text-base text-foreground">{result.mainClause}</p>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                      <p className="text-sm font-semibold text-secondary mb-1">Mellékmondat:</p>
                      <p className="text-base text-foreground">{result.subordinateClause}</p>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground italic mt-3">
                  Elemzés megbízhatósága: {result.confidence}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};

export default AnalyzerSection;
