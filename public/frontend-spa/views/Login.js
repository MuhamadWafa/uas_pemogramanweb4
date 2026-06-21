export default {
    template: `
    <div class="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#022c22] via-[#064e3b] to-[#0f766e] px-4 overflow-hidden">
        <!-- Ambient Light Effects -->
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#10b981]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0d9488]/15 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div class="relative max-w-md w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 text-white z-10 transition-all duration-300 hover:border-white/30">
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 shadow-inner mb-4 animate-bounce duration-[3000ms]">
                    <span class="text-3xl">📦</span>
                </div>
                <h2 class="text-3xl font-extrabold tracking-tight text-white mb-2">Penyimpanan XX</h2>
                <p class="text-sm text-emerald-200/80">Sistem Manajemen Stok Terintegrasi</p>
            </div>
            <form @submit.prevent="handleLogin" class="space-y-5">
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-emerald-200/90 mb-1.5">Username Admin</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-300/60">👤</span>
                        <input v-model="username" type="text" required placeholder="Masukkan username" 
                            class="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-opacity-20 backdrop-blur-sm">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold uppercase tracking-wider text-emerald-200/90 mb-1.5">Password</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-emerald-300/60">🔒</span>
                        <input :type="showPassword ? 'text' : 'password'" v-model="password" required placeholder="Masukkan password" 
                            class="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 bg-opacity-20 backdrop-blur-sm">
                        <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-emerald-300/60 hover:text-white transition-colors">
                            <span v-if="showPassword">🔒</span>
                            <span v-else>👁️</span>
                        </button>
                    </div>
                </div>
                <button type="submit" class="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 rounded-xl transition duration-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                    Masuk ke Dashboard
                </button>
            </form>
            <div class="mt-6 text-center text-sm">
                <p class="text-emerald-200/70">Belum punya akun admin? 
                    <router-link to="/register" class="text-emerald-300 font-semibold hover:text-emerald-200 hover:underline transition-colors">Daftar Akun Baru</router-link>
                </p>
            </div>
        </div>
    </div>
    `,
    setup() {
        const username = Vue.ref('');
        const password = Vue.ref('');
        const showPassword = Vue.ref(false);
        const router = VueRouter.useRouter();

        const handleLogin = () => {
            axios.post('http://localhost:8080/api/login', {
                username: username.value,
                password: password.value
            })
            .then(response => {
                const resData = response.data;
                const token = resData.token || (resData.data && resData.data.token);
                const isSuccess = response.status === 200 || resData.status === 200;

                if (isSuccess && token) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', token);
                    console.log('Login (view): token saved, redirecting to /dashboard/barang');
                    router.push('/dashboard/barang');
                } else {
                    alert('Username atau Password salah!');
                }
            })
            .catch(error => {
                console.error('Login error', error);
                const msg = error.response && error.response.data && error.response.data.messages ? error.response.data.messages.error : 'Username atau Password admin salah!';
                alert('Login Gagal: ' + msg);
            });
        };

        return { username, password, showPassword, handleLogin };
    }
};