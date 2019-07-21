(() => {
    let warningBar = {};
    warningBar.draw = (args) => {
        let dataset = args.dataset,
            padding = args.padding,
            width = args.width,
            height = args.height,
            warning = args.warning;

        let svg = d3.select(`#${args.id}`).append('svg').attr('width', width).attr('height', height);

        let xScale = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([0, width - padding.left], 0.2, 0.5);

        let yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, (d) => {
                return Number(d.value)
            })])
            .range([0, height - padding.top]);

        let initPath = [],
            resurltPath = [],
            barWidth = xScale.rangeBand(),
            inith = 100;

        for (let i = 0; i < dataset.length; i++) {
            initPath.push([])
            let x1 = xScale(i) + padding.left + barWidth / 2;
            let x2 = xScale(i) + padding.left;
            let x3 = xScale(i) + padding.left + barWidth;
            let x4 = xScale(i) + padding.left;
            let x5 = xScale(i) + padding.left + barWidth;
            let x6 = xScale(i) + padding.left + barWidth / 2;

            let y1 = height - padding.left + 15;
            let y2 = height - padding.left;
            let y3 = height - padding.left;
            let y4 = height - padding.left - inith;
            let y5 = height - padding.left - inith;
            let y6 = height - padding.left + 15 - inith;

            initPath[i].push("M", x1, y1, "L", x2, y2, "L", x4, y4, "L", x6, y6, "L", x1, y1, "L", x3, y3, "L", x5, y5, "L", x6, y6);
        };
        console.log(initPath);
        svg.selectAll('.bar')
            .data(dataset)
            .enter()
            .append('path')
            .attr('d', (d, i) => {
                console.log(initPath[i]);
                return initPath[i].join(" ");
            })
            .attr('stroke', '#44fc7e')
            .attr('fill', '#134423')

    }
    this.warningBar = warningBar;
})()