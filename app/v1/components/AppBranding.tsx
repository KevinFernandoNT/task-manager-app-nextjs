export default function AppBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 px-12">
      <div className="text-center text-white">
        <h1 className="mb-6 text-6xl font-bold">Task Manager</h1>
        <p className="text-md font-light leading-relaxed opacity-90">
          Organize your life
          one task at a time.
        </p>
      </div>
    </div>
  );
}

