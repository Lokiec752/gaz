export default function Loading() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-amber-900 mb-4">Wykres</h1>

      <div className="animate-pulse">
        <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30">
          <div className="p-5 bg-amber-50/60 sm:w-[328px] md:w-[416px]">
            <h1 className="text-xl font-bold text-amber-900 mb-4">Koszty</h1>
            <div className="h-[198px]"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse">
        <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30">
          <div className="p-5 bg-amber-50/60 sm:w-[328px] md:w-[416px]">
            <h1 className="text-xl font-bold text-amber-900 mb-4">
              Zużycie gazu
            </h1>
            <div className="h-[198px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
