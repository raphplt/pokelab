<script>
    const bgColor1 = "#EE9219";
    const bgColor2 = "#E18079";
    let score = 0;

    /**
	 * @type {any}
	 */
     export let attack ;
    /**
	 * @type {any}
	 */
     export let defense;
    /**
	 * @type {any}
	 */
     export let hp;
     if (attack != null) {
        score = attack;
     }
    if (defense != null) {
        score = defense;
    }
    if (hp != null) {
        score = hp;
    }

    /**
	 * @param {number} value
	 */
    function setScore (value ) {
        score = value;
        if (attack != null) {
            attack = score;
        }
        if (defense != null) {
            defense = score;
        }
        if (hp != null) {
            hp = score;
        }
    }

</script>

<div class="w-2/3 h-6 mx-auto rounded-3xl bg-[#EEEEEE] flex justify-center gap-[1px]">
        <button on:click={() => setScore(1)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300" 
        style={`${score >= 1 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(2)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 2 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(3)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 3 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(4)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 4 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(5)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 5 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>

        <span class="h-full w-1"></span>
        <button on:click={() => setScore(6)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 6 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(7)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 7 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(8)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 8 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(9)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 9 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(10)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 10 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <span class="h-full w-1"></span>
        <button on:click={() => setScore(11)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 11 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(12)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 12 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() =>setScore(13)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 13 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(14)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 14 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
        <button on:click={() => setScore(15)} class="border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300"
        style={`${score >= 15 ? `background-color: ${bgColor1}` : `background-color: "#CBD5E1"`}`}
        ></button>
</div>