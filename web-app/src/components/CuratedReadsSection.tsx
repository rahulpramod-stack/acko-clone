import { useState, useRef, useCallback, useEffect } from "react";

const imgArticleFamily = "./assets/figma/article-family.png";
const imgArticleWoman  = "./assets/figma/article-woman.jpg";

type Article = {
  image: string;
  category: string;
  categoryColor: string;
  headline: string;
};

const articles: Article[] = [
  {
    image: imgArticleWoman,
    category: "HEALTH",
    categoryColor: "#bb97ff",
    headline: "Can you skip a red light for a medical emergency?",
  },
  {
    image: imgArticleFamily,
    category: "Insurance basics",
    categoryColor: "#5920c5",
    headline: 'What exactly is the "Waiting Period" for pre-existing diseases?',
  },
  {
    image: imgArticleWoman,
    category: "Car insurance",
    categoryColor: "#bb97ff",
    headline: "5 things to check before renewing your car insurance",
  },
  {
    image: imgArticleFamily,
    category: "Life insurance",
    categoryColor: "#5920c5",
    headline: "Term insurance vs whole life: which one is right for you?",
  },
];

const CARD_WIDTH = 252;
const CARD_GAP = 14;

function ArticleCard({ article, active }: { article: Article; active: boolean }) {
  return (
    <div
      className="shrink-0 flex flex-col gap-3 p-3 bg-[#f0f0f0] transition-all duration-300"
      style={{
        width: CARD_WIDTH,
        borderRadius: active ? 20 : 10,
        opacity: active ? 1 : 0.4,
        transform: active ? "scale(1)" : "scale(0.92)",
      }}
    >
      <div className="overflow-hidden rounded-[12px] shrink-0" style={{ height: 114 }}>
        <img src={article.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-medium" style={{ fontSize: 10, lineHeight: "20px", color: article.categoryColor }}>
          {article.category}
        </span>
        <p
          className="font-semibold text-[#3b3b3b]"
          style={{ fontSize: active ? 16 : 14, lineHeight: "20px", letterSpacing: active ? "-0.64px" : "-0.56px" }}
        >
          {article.headline}
        </p>
      </div>
    </div>
  );
}

export default function CuratedReadsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const containerWidth = el.offsetWidth;
    const cardCenter = idx * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
    el.scrollTo({ left: cardCenter - containerWidth / 2, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToIndex(0);
  }, [scrollToIndex]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    articles.forEach((_, i) => {
      const cardCenter = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    scrollToIndex(activeIndex);
  };

  return (
    <div
      className="flex flex-col gap-5 py-6 flex-1"
      style={{ background: "linear-gradient(182deg, rgb(244,236,255) 1.7%, rgb(255,255,255) 27.5%)" }}
    >
      <p className="font-semibold text-[#121212] px-4" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
        Your curated reads
      </p>

      <div className="flex flex-col gap-4">
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ gap: CARD_GAP, scrollSnapType: "x mandatory", paddingLeft: 62, paddingRight: 62 }}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {articles.map((article, i) => (
            <div key={i} style={{ scrollSnapAlign: "center" }} onClick={() => scrollToIndex(i)}>
              <ArticleCard article={article} active={i === activeIndex} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {articles.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                backgroundColor: i === activeIndex ? "#5920c5" : "#d4d4d4",
              }}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center px-4">
          <button
            className="border-0 cursor-pointer font-medium text-white"
            style={{
              backgroundColor: "#121212",
              borderRadius: 40,
              padding: "8px 12px",
              fontSize: 12,
              lineHeight: "18px",
            }}
          >
            View all  →
          </button>
        </div>
      </div>
    </div>
  );
}
