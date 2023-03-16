const { createApp } = Vue

const app = createApp({
    data(){
        return {
    // Inicializamos las variables
        eventoseventosFuturos: [],
        eventosPasados: [],
        mayorAsistencia: "",
        menorAsistencia: "",
        mayorCapacidad: "",
        categories: {},
        categories2: {},
        }
    },
    created(){
        fetch( 'https://mindhub-xj03.onrender.com/api/amazing' )
        .then( response => response.json() )
        .then( data => { 
            this.eventosFuturos = data.events.filter(event => event.date >= data.currentDate);
            this.eventosPasados = data.events.filter(event => event.date < data.currentDate);

            //tabla 1
            this.mayorAsistencia = this.eventosPasados.sort((evento1, evento2) => {
                return (
                    (evento1.assistance / evento1.capacity) * 100 -
                    (evento2.assistance / evento2.capacity) * 100
                );
            }).slice(-1)[0]

            this.menorAsistencia = this.eventosPasados.sort((evento1, evento2) => {
                return (
                    (evento1.assistance / evento1.capacity) * 100 -
                    (evento2.assistance / evento2.capacity) * 100
                );
            }).slice(0,1)[0]

            this.mayorCapacidad = data.events.sort((evento1, evento2) => {
                return ( evento1.capacity - evento2.capacity);
            }).slice(-1)[0]
            
            //tabla 2
            this.eventosFuturos.forEach(event => {
                // Si la categoría no existe la creamos
                if (!this.categories[event.category]) {
                    this.categories[event.category] = {
                        price: 0,
                        estimate: 0,
                        capacity: 0,
                    }
                }
                // Sumamos los ingresos la asistencia y la capacity a la categoría correspondiente
                this.categories[event.category].price += event.price * event.estimate
                this.categories[event.category].capacity += event.capacity
                this.categories[event.category].estimate += event.estimate
            })

            //tabla 3
            this.eventosPasados.forEach(event => {
                // Si la categoría no existe la creamos
                if (!this.categories2[event.category]) {
                    this.categories2[event.category] = {
                        price: 0,
                        assistance: 0,
                        capacity: 0,
                    }
                }
                // Sumamos los ingresos la asistencia y la capacity a la categoría correspondiente
                this.categories2[event.category].price += event.price * event.assistance
                this.categories2[event.category].capacity += event.capacity
                this.categories2[event.category].assistance += event.assistance
            })    
        })
        .catch( err => console.log( err ) )
    },
})
    
app.mount("#app")