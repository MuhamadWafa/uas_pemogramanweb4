const BarangComp = {
    template: `
    <div class="flex min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
        <!-- Background glowing accents -->
        <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div class="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <!-- Sidebar / Menu Samping -->
        <aside class="w-64 bg-slate-900/80 backdrop-blur-md text-white p-6 flex flex-col border-r border-slate-800 relative z-10">
            <div class="mb-6">
                <h1 class="text-xl font-extrabold tracking-tight flex items-center gap-2">
                    <span class="filter drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]">📦</span> Penyimpanan XX
                </h1>
                <p class="text-xs text-slate-400 mt-1">Admin Panel SPA</p>
            </div>
            <nav class="space-y-2">
                <a href="#/dashboard" class="block py-2.5 px-4 rounded-xl transition hover:bg-slate-800/60 text-slate-300">Dashboard</a>
                <a href="#/barang" class="block py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-semibold shadow-[0_4px_15px_rgba(16,185,129,0.2)]">Data Inventaris</a>
            </nav>
            <button @click="logout" class="w-full text-left block py-2.5 px-4 rounded-xl text-rose-400 hover:bg-red-950/40 hover:text-white transition mt-auto font-bold border border-red-900/40">
                Keluar (Logout)
            </button>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 p-8 relative z-10 overflow-y-auto">
            <div class="flex justify-between items-center mb-6 animate-fade-in-up">
                <h2 class="text-2xl font-extrabold text-white">Manajemen Inventaris Barang</h2>
                <button class="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.2)] transition transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                    + Tambah Barang
                </button>
            </div>

            <!-- Tabel Data Master (Tailwind CSS) -->
            <div class="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800/80 overflow-hidden animate-fade-in-up" style="animation-delay: 150ms;">
                <table class="min-w-full divide-y divide-slate-800/60">
                    <thead class="bg-slate-900/60">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider">Kode</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider">Nama Barang</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider">Stok</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-emerald-400 uppercase tracking-wider">Supplier</th>
                            <th class="px-6 py-4 text-center text-xs font-bold text-emerald-400 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60 text-sm text-slate-300">
                        <tr v-for="(item, index) in items" :key="item.id"
                            :style="{ animationDelay: (index * 60) + 'ms' }"
                            class="animate-fade-in-up opacity-0 hover:bg-emerald-950/20 transition-all duration-200">
                            <td class="px-6 py-4 whitespace-nowrap font-mono text-emerald-400 font-bold">{{ item.item_code }}</td>
                            <td class="px-6 py-4 whitespace-nowrap font-semibold text-white">{{ item.item_name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2.5 py-1 inline-flex text-xs font-semibold rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">
                                    {{ item.stock }} Unit
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-slate-400">{{ item.supplier }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                <button class="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">Ubah ✏️</button>
                                <button class="text-red-400 hover:text-red-300 font-bold transition-colors">Hapus 🗑️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
    `,
    data() {
        return { items: [] }
    },
    mounted() {
        this.fetchItems();
    },
    methods: {
        async fetchItems() {
            try {
                // Otomatis menyertakan token berkat Axios Interceptor
                const response = await axios.get('items');
                this.items = response.data;
            } catch (error) {
                console.error("Gagal memuat inventaris:", error);
            }
        },
        logout() {
            localStorage.clear(); // Otomatis menghapus seluruh sesi token di penyimpanan lokal
            alert('Anda telah keluar dari aplikasi.');
            window.safeNavigate('/login'); // Kembalikan ke form login
        }
    }
};