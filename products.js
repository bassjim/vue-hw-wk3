
Vue.createApp({
    data(){
        return{
            apiUrl:'https://vue3-course-api.hexschool.io/v2/',
            api_path:'bassjim',
            products:[],
            tempProduct:{
                imageUrl:[],
            },
            is_New:false,
        };
    },
    methods:{   
        getProducts(){
            const url = `${this.apiUrl}api/${this.api_path}/admin/products/all`;
            axios.get(`${url}`)
            .then((res)=>{
                this.products = res.data.products;
                console.log(this.products);
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.getProducts;
    }
})
.mount("#app")