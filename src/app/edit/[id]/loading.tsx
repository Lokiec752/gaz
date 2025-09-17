export default function Loading() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-amber-900">Edytuj fakturę</h1>

      <div className="animate-pulse">
        <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30 sm:w-[328px] md:w-[416px]">
          <div className="px-4 py-3 bg-amber-50/60">
            <h2 className="text-lg font-semibold text-amber-800 mb-4">
              Dane z faktury
            </h2>
            <div className="h-[472px]"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse">
        <div className="divide-y divide-amber-200/50 rounded-xl border border-amber-200/60 overflow-hidden bg-amber-25/30 sm:w-[328px] md:w-[416px]">
          <div className="px-4 py-3 bg-amber-50/60">
            <h2 className="text-lg font-semibold text-amber-800 mb-4">
              Stany liczników
            </h2>
            <div className="h-[186px]"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse sm:w-[328px] md:w-[416px]">
        <div className="h-[44px] bg-amber-200/50 rounded-lg"></div>
      </div>
    </div>
  );
}
