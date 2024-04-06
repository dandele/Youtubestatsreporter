<script lang="ts">
	import { scaleLinear } from "d3-scale";
    import { onMount } from 'svelte';

    export let data = [];

let xTicks = [];
let yTicks = [];
let padding = { top: 20, right: 15, bottom: 20, left: 45 };
let width = 2000;
let height = 200;
let xScale;
let yScale;
let innerWidth;
let barWidth;

function formatMobile(tick: number | string) {
  return "'" + tick.toString().slice(-2);
}

// Aggiorna i dati quando cambiano
$: {
  xTicks = data.map((d) => d.title);
  console.log('titoli ' + xTicks);
  xScale = scaleLinear()
    .domain([0, xTicks.length])
    .range([padding.left, width - padding.right]);

  yTicks = data.map((y) => y.views);
  console.log('views ' + yTicks);  
  yScale = scaleLinear()
    .domain([0, Math.max.apply(null, yTicks) + 10000])
    .range([height - padding.bottom, padding.top]);

  innerWidth = width - (padding.left + padding.right);
  barWidth = innerWidth / xTicks.length;
}
</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="text-xs" transform="translate(0, {yScale(tick)})">
					<text
						stroke="none"
						font-size="12"
						orientation="left"
						width="60"
						height="310"
						x="57"
						y="-4"
						fill="#888888"
						text-anchor="end"
                        >
                        
                        <tspan x="36" dy="0.355em">${tick}</tspan>
                        </text
					>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each data as point, i}
				<g class="text-xs" transform="translate({xScale(i) + barWidth / 2},{height + 5})">
					<text
						stroke="none"
						font-size="12"
						orientation="bottom"
						width="531"
						height="30"
						x={barWidth / 2}
						y="-15"
						fill="#888888"
						text-anchor="middle"
						><tspan x={barWidth / 2} dy="0.71em"
							>{width > 380 ? point.title : formatMobile(point.title)}</tspan
						></text
					>
				</g>
			{/each}
		</g>

		<g>
			{#each data as point, i}
				<rect
					class="bg-primary-foreground"
					x={xScale(i) + 2}
					y={yScale(point.views)}
					width={barWidth - 8}
					height={yScale(0) - yScale(point.views)}
					fill="currentColor"
					rx="4"
					ry="4"
				/>
			{/each}
		</g>
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 350px;
	}

	rect {
		max-width: 51px;
	}
</style>