<script>
	let color = '#EE9219';
	let score = 0;
	let hover = 0;
	const style = `border-x-slate-300 border-1 h-full w-[6.66%] bg-slate-300`;

	/**
	 * @type {any}
	 */
	export let attack;
	/**
	 * @type {any}
	 */
	export let stamina;
	/**
	 * @type {any}
	 */
	export let hp;
	if (attack != null) {
		score = attack;
	}
	if (stamina != null) {
		score = stamina;
	}
	if (hp != null) {
		score = hp;
	}

	/**
	 * @param {number} value
	 */
	function setScore(value) {
		score = value;

		if (attack != null) {
			attack = score;
		}
		if (stamina != null) {
			stamina = score;
		}
		if (hp != null) {
			hp = score;
		}

		if (score == 15) {
			color = '#E18079';
		}
	}

	const setScoreNull = () => {
		if (score == 0) score = 1;
		else score = 0;
		if (attack != null) {
			attack = score;
		}
		if (stamina != null) {
			stamina = score;
		}
		if (hp != null) {
			hp = score;
		}
	};

	/**
	 * @param {number} number
	 */
	function setHover(number) {
		hover = number;
	}
</script>

<div class="h-6 mx-auto rounded-3xl bg-[#EEEEEE] flex justify-center gap-[1px]">
	<button
		on:click={() => setScoreNull()}
		class={`${style} rounded-l-xl`}
		style={`${score >= 1 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(2)}
		class={`${style}`}
		style={`${score >= 2 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(3)}
		class={`${style}`}
		style={`${score >= 3 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(4)}
		class={`${style}`}
		style={`${score >= 4 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(5)}
		class={`${style}`}
		style={`${score >= 5 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>

	<span class="h-full w-1" />
	<button
		on:click={() => setScore(6)}
		class={`${style}`}
		style={`${score >= 6 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(7)}
		class={`${style}`}
		style={`${score >= 7 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(8)}
		class={`${style}`}
		style={`${score >= 8 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(9)}
		class={`${style}`}
		style={`${score >= 9 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(10)}
		class={`${style}`}
		style={`${score >= 10 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<span class="h-full w-1" />
	<button
		on:click={() => setScore(11)}
		class={`${style}`}
		style={`${score >= 11 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(12)}
		class={`${style}`}
		style={`${score >= 12 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(13)}
		class={`${style}`}
		style={`${score >= 13 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(14)}
		class={`${style}`}
		style={`${score >= 14 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
	<button
		on:click={() => setScore(15)}
		class={`${style} rounded-r-xl`}
		style={`${score >= 15 ? `background-color: ${color}` : `background-color: "#CBD5E1"`}`}
	/>
</div>
