export default {
    template: `
    <div class="bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800/80 overflow-hidden animate-fade-in-up" style="animation-delay: 150ms;">
        <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
            <div>
                <h3 class="font-extrabold text-lg text-emerald-100 flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Daftar Stok Inventaris Master
                </h3>
                <p class="text-xs text-slate-400 mt-1">Kelola data logistik, kategori, beserta informasi supplier terkait</p>
            </div>
            <button @click="ambilData" class="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold px-4 py-2.5 rounded-xl transition duration-300 border border-slate-700/80 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center gap-2">
                🔄 Ambil Ulang Data
            </button>
        </div>

        <div v-if="loading" class="p-16 text-center text-slate-400">
            <div class="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p class="text-sm font-medium animate-pulse">Menghubungi RESTful API Server...</p>
        </div>

        <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-900/60 border-b border-slate-800 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <th class="px-6 py-4">Kode Barang</th>
                        <th class="px-6 py-4">Nama Barang</th>
                        <th class="px-6 py-4">Kategori</th>
                        <th class="px-6 py-4">Supplier</th>
                        <th class="px-6 py-4 text-right">Harga Satuan</th>
                        <th class="px-6 py-4 text-center">Stok Gudang</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm text-slate-300">
                    <tr v-for="(item, index) in barang" :key="item.id" 
                        :style="{ animationDelay: (index * 60) + 'ms' }"
                        class="animate-fade-in-up opacity-0 hover:bg-emerald-950/20 transition-all duration-200">
                        <td class="px-6 py-4 font-mono text-xs font-bold text-emerald-400">{{ item.kode_barang }}</td>
                        <td class="px-6 py-4 font-semibold text-white">{{ item.nama_barang }}</td>
                        <td class="px-6 py-4">
                            <span class="bg-slate-800/80 text-emerald-300 text-xs px-2.5 py-1 rounded-md border border-slate-700/50">
                                {{ item.nama_kategori || 'Elektronik & Gadget' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-slate-400 text-xs">{{ item.nama_supplier || 'Supplier Utama' }}</td>
                        <td class="px-6 py-4 text-right font-semibold text-white">
                            Rp {{ Number(item.harga).toLocaleString('id-ID') }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <span :class="item.stok > 20 ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80' : 'bg-amber-950/60 text-amber-400 border-amber-800/80'" 
                                  class="text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm">
                                {{ item.stok }} pcs
                            </span>
                        </td>
                    </tr>
                    <tr v-if="barang.length === 0">
                        <td colspan="6" class="px-6 py-12 text-center text-slate-500">Database kosong atau server mati.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    setup() {
        const barang = Vue.ref([]);
        const loading = Vue.ref(true);

        const ambilData = () => {
            loading.value = true;
            axios.get('http://localhost:8080/api/barang')
                .then(response => {
                    barang.value = Array.isArray(response.data) ? response.data : (response.data.data || []);
                    loading.value = false;
                })
                .catch(error => {
                    console.error("Gagal memuat API:", error);
                    loading.value = false;
                });
        };

        Vue.onMounted(() => {
            ambilData();
        });

        return { barang, loading, ambilData };
    }
};