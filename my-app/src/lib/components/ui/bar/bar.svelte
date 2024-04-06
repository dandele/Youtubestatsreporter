<script lang="ts">
	import { scaleLinear } from "d3-scale";
    import { onMount } from 'svelte';

    export let data = [];

let xTicks = [];
let yTicks = [];
let yTicksLikes = [];
let yTicksComments = [];
let padding = { top: 20, right: 15, bottom: 20, left: 45 };
let width = 2000;
let height = 200;
let xScale;
let yScale;
let yScaleLikes;
let yScaleComments;
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
    .domain([0, Math.max.apply(null, yTicks)])
    .range([height - padding.bottom, padding.top]);
  
	yTicksLikes = data.map((y) => y.likes);
  console.log('likes ' + yTicksLikes);  
  yScaleLikes = scaleLinear()
    .domain([0, Math.max.apply(null, yTicksLikes)])
    .range([height - padding.bottom, padding.top]);
	
	yTicksComments = data.map((y) => y.comments);
  console.log('comments ' + yTicksComments);  
  yScaleComments = scaleLinear()
    .domain([0, Math.max.apply(null, yTicksComments)])
    .range([height - padding.bottom, padding.top]);

  innerWidth = width - (padding.left + padding.right);
  barWidth = innerWidth / xTicks.length;
}
</script>


<!-- Barra Views -->

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<h2>Report Views</h2>
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
                        
                        <tspan x="36" dy="0.355em">{tick}</tspan>
                        </text
					>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each data as point, i}
				<g class="text-xs" transform="translate({xScale(i)},{height + 5})">
					<text
						stroke="none"
						font-size="12"
						orientation="bottom"
						width={barWidth - 30}
						height="30"
						x="0"
						y="-15"
						fill="#888888"
						text-anchor="middle"
						><tspan x={barWidth / 3} dy="0.71em"
							>{width > 380 ? i + 1: formatMobile(i + 1)}</tspan
						></text
					>
				</g>
			{/each}
		</g>

		<g>
			{#each data as point, i}
				<rect
					class="bg-primary-foreground"
					x={xScale(i)}
					y={yScale(point.views)}
					width={barWidth - 30}
					height={yScale(0) - yScale(point.views)}
					fill="currentColor"
					rx="4"
					ry="4"
				/>
			{/each}
		</g>
	</svg>
</div>

<!-- Barra Likes -->

<div class="chart mt-20" bind:clientWidth={width} bind:clientHeight={height}>
	<h2>Report Likes</h2>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicksLikes as tickLikes}
				<g class="text-xs" transform="translate(0, {yScaleLikes(tickLikes)})">
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
                        
                        <tspan x="36" dy="0.355em">{tickLikes}</tspan>
                        </text
					>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each data as point, i}
				<g class="text-xs" transform="translate({xScale(i)},{height + 5})">
					<text
						stroke="none"
						font-size="12"
						orientation="bottom"
						width={barWidth - 30}
						height="30"
						x="0"
						y="-15"
						fill="#888888"
						text-anchor="middle"
						><tspan x={barWidth / 3} dy="0.71em"
							>{width > 380 ? i + 1: formatMobile(i + 1)}</tspan
						></text
					>
				</g>
			{/each}
		</g>

		<g>
			{#each data as point, i}
				<rect
					class="bg-primary-foreground"
					x={xScale(i)}
					y={yScaleLikes(point.likes)}
					width={barWidth - 30}
					height={yScaleLikes(0) - yScaleLikes(point.likes)}
					fill="currentColor"
					rx="4"
					ry="4"
				/>
			{/each}
		</g>
	</svg>
</div>


<!-- Barra Comments -->

<div class="chart mt-20" bind:clientWidth={width} bind:clientHeight={height}>
	<h2>Report Comments</h2>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicksComments as tick}
				<g class="text-xs" transform="translate(0, {yScaleComments(tick)})">
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
                        
                        <tspan x="36" dy="0.355em">{tick}</tspan>
                        </text
					>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each data as point, i}
				<g class="text-xs" transform="translate({xScale(i)},{height + 5})">
					<text
						stroke="none"
						font-size="12"
						orientation="bottom"
						width={barWidth - 30}
						height="30"
						x="0"
						y="-15"
						fill="#888888"
						text-anchor="middle"
						><tspan x={barWidth / 3} dy="0.71em"
							>{width > 380 ? i + 1: formatMobile(i + 1)}</tspan
						></text
					>
				</g>
			{/each}
		</g>

		<g>
			{#each data as point, i}
				<rect
					class="bg-primary-foreground"
					x={xScale(i)}
					y={yScaleComments(point.comments)}
					width={barWidth - 30}
					height={yScaleComments(0) - yScaleComments(point.comments)}
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
	}

	svg {
		position: relative;
		width: 100%;
		height: 500px;
	}

	rect {
		max-width: 51px;
	}
</style>