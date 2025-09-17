export default function Loading() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-amber-900">Ostatnie faktury</h1>
      <div className="animate-pulse">
        <div className="space-y-4 pt-5">
          <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30 h-[200px] sm:w-[328px] md:w-[416px]">
            <div className="flex items-center justify-between px-4 py-3 bg-amber-50/60 hover:bg-amber-100/50 transition-colors h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
