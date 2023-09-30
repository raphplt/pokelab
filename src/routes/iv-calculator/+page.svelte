<script>
    import IvBar from "../../components/+iv_bar.svelte";

    let attack = 0;
    let defense = 0;
    let hp = 0;
    let iv = 0;

    function calculIV() {
        iv =  Math.floor((attack + defense + hp) / 45 * 100);
    }
</script>

<div class="h-[95vh]">
    <h1 class="text-2xl text-center py-4">Bienvenue sur le calculateur d'IV pokémon !</h1>
    <h2 class="text-center text-xl py-3 pb-12">Vous pouvez ici calculer les IV de votre pokémon en fonction de ses statistiques.</h2>
    
    <div class="w-1/2 mx-auto flex gap-10 flex-col justify-center">
        <div>
          <IvBar bind:attack={attack} defense={null} hp={null} />
        </div>
        <div>
         <IvBar attack={null} bind:defense={defense} hp={null} />
        </div>
        <div>
          <IvBar attack={null} defense={null} bind:hp={hp} />
        </div>
    </div>
    { attack }
    { defense }
    { hp }
    <button
    on:click={ () => {
        calculIV();
        }
    }
    class="mx-auto flex justify-center mb-6 rounded-xl bg-cyan-500 text-white w-fit py-1 px-6 text-lg">
    Calculer
    </button>
    <p class="text-center text-xl">
            IV : {iv}
    </p>

</div>
