export default {
    template: `
    <div class="min-h-screen flex bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
        <!-- Background glowing accents -->
        <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div class="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <aside class="w-64 bg-slate-900/80 backdrop-blur-md text-white flex flex-col shadow-2xl border-r border-slate-800 relative z-10">
            <div class="p-6 border-b border-slate-800">
                <h1 class="text-xl font-extrabold flex items-center gap-2 tracking-tight">
                    <span class="filter drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]">📦</span> Penyimpanan XX
                </h1>
                <p class="text-xs text-slate-400 mt-1">Admin Panel SPA</p>
            </div>
            <nav class="flex-1 p-4 space-y-2">
                <router-link to="/dashboard/barang" class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all" active-class="bg-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)]">
                    <span>🗃️</span> Data Inventaris Barang
                </router-link>
            </nav>
            <div class="p-4 border-t border-slate-800">
                <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white text-sm font-bold py-2.5 rounded-xl transition border border-red-900/80">
                    🚪 Keluar Sistem (Logout)
                </button>
            </div>
        </aside>

        <div class="flex-1 flex flex-col overflow-hidden relative z-10">
            <header class="bg-slate-900/40 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center shadow-md animate-fade-in-up">
                <h2 class="text-sm font-medium text-slate-400">Selamat datang kembali, <span class="font-bold text-white">Admin</span></h2>
                <span class="bg-emerald-950/60 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-800/80 shadow-inner">Server Terhubung (CORS OK)</span>
            </header>
            <main class="flex-1 overflow-x-hidden overflow-y-auto p-8">
                <router-view></router-view>
            </main>
        </div>
    </div>
    `,
    setup() {
        const router = VueRouter.useRouter();
        const { onMounted } = Vue;

        // Pastikan pengguna sudah terautentikasi saat memasuki Dashboard
        onMounted(() => {
            const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
            if (!isAuthenticated) {
                console.log('Dashboard: user not authenticated — redirecting to /login');
                alert('Akses Ilegal Ditolak! Sila Login Dahulu.');
                window.safeNavigate('/login');
            } else {
                console.log('Dashboard: user authenticated');
            }
        });

        const handleLogout = () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token'); // Menghapus seluruh sesi token [cite: 35]
            window.safeNavigate('/login');
        };
        return { handleLogout };
    }
};
