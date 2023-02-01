let productModal = null;

Vue.createApp({
    data(){
        return{
            apiUrl:'https://vue3-course-api.hexschool.io/v2/',
            api_path:'bassjim',
            products:[],
            tempProduct:{
                imageUrl:[],
            },
            isNew:false,
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
        },
        openModel(){
            productModal.show();
        },
        updateProducts(){           
            const url = `${this.apiUrl}api/${this.api_path}/admin/product`;
            axios.post(`${url}`,{data:this.tempProduct})
            .then((res=>{
                this.getProducts();
                productModal.hide();//關閉Model
            }))
        }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.getProducts();

        productModal = new bootstrap.Modal('#productModal');
        
    }
})
.mount("#app")