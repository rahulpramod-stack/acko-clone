const imgArticleFamily = "https://www.figma.com/api/mcp/asset/35295eb9-5ee3-4cfc-a9f1-d5dcac7ceb9d";
const imgArticleWoman  = "https://www.figma.com/api/mcp/asset/1469e322-6aa0-4792-ba8a-c17c9dea598c";

function ArticleCard({
  image,
  category,
  categoryColor,
  headline,
  width,
  imageHeight,
  borderRadius,
  opacity = 1,
  headlineSize = 16,
}: {
  image: string;
  category: string;
  categoryColor: string;
  headline: string;
  width: number;
  imageHeight: number;
  borderRadius: number;
  opacity?: number;
  headlineSize?: number;
}) {
  return (
    <div
      className="shrink-0 flex flex-col gap-3 p-3 bg-[#f0f0f0]"
      style={{ width, borderRadius, opacity }}
    >
      <div className="overflow-hidden rounded-[12px] shrink-0" style={{ height: imageHeight }}>
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-medium" style={{ fontSize: 10, lineHeight: "20px", color: categoryColor }}>
          {category}
        </span>
        <p
          className="font-semibold text-[#3b3b3b]"
          style={{ fontSize: headlineSize, lineHeight: "20px", letterSpacing: `${-0.04 * headlineSize}px` }}
        >
          {headline}
        </p>
      </div>
    </div>
  );
}

export default function CuratedReadsSection() {
  return (
    <div
      className="flex flex-col gap-5 py-6 flex-1"
      style={{ background: "linear-gradient(182deg, rgb(244,236,255) 1.7%, rgb(255,255,255) 27.5%)" }}
    >
      <p className="font-semibold text-[#121212] px-4" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
        Your curated reads
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex gap-3.5 items-center justify-center overflow-x-hidden">
          <ArticleCard
            image={imgArticleWoman}
            category="HEALTH"
            categoryColor="#bb97ff"
            headline="Can you skip a red light for a medical emergency?"
            width={193}
            imageHeight={108}
            borderRadius={10}
            opacity={0.2}
            headlineSize={14}
          />
          <ArticleCard
            image={imgArticleFamily}
            category="Insurance basics"
            categoryColor="#5920c5"
            headline={'What exactly is the "Waiting Period" for pre-existing diseases?'}
            width={252}
            imageHeight={114}
            borderRadius={20}
          />
          <ArticleCard
            image={imgArticleFamily}
            category="Insurance basics"
            categoryColor="#bb97ff"
            headline="Can you skip a red light for a medical emergency?"
            width={193}
            imageHeight={110}
            borderRadius={10}
            opacity={0.2}
            headlineSize={14}
          />
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
