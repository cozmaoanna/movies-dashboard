    
    queue()
        .defer(d3.csv, "data/movie_metadata.csv")
        .defer(d3.json, "data/countries.geo.json")
        .await(makeGraphs);
        
        
    function makeGraphs(error, moviesData, geoData) {
        var ndx = crossfilter(moviesData);
        
        //-------------pie chart----------
        
        // var genres_dim = ndx.dimension(dc.pluck('genres'));
        // var genres_chart = genres_dim.group();
        
        // dc.pieChart('#genres')
        //     .height(500)
        //     .radius(300)
        //     .transitionDuration(1500)
        //     .dimension(genres_dim)
        //     .group(genres_chart);
        
         var country_dim = ndx.dimension(dc.pluck('country'));
        var country_chart = country_dim.group();
        
        dc.pieChart('#country')
            .height(300)
            .radius(100)
            .transitionDuration(1500)
            .dimension(country_dim)
            .group(country_chart);
            
            
            
      
    //                             //-------------bubble chart ----------
    
    
    moviesData.forEach(function(d){
            d.title_year = +d.title_year;
        });

        var countryDim = ndx.dimension(function(d){
            return d.country;
        });

        var statsByCountry = countryDim.group().reduce(
            function (p, v) {
                p.count++;
                p.budget += +v["budget"];
                return p;
            },
            function (p, v) {
                p.count--;
                p.budget -= +v["budget"];
                return p;
            },
            function () {
                return {count: 0, budget: 0}
            }
        );

        var budget_per_country_chart = dc.bubbleChart("#budget_per_country_chart");

        budget_per_country_chart
            .width(990)
            .height(400)
            .margins({top: 100, right: 200, bottom: 30, left: 100})
            .dimension(countryDim)
            .group(statsByCountry)
            .colors(d3.scale.category20())
            .keyAccessor(function (p) {
                return p.value.count;
            })
            .valueAccessor(function (p) {
                return p.value.budget;
            })
            .radiusValueAccessor(function (p) {
                return p.value.count;
            })
            .x(d3.scale.linear().domain([0, 4000]))
            // .x(d3.scale.ordinal())
            .r(d3.scale.linear().domain([0, 4000]).range(0, 100))
            .minRadiusWithLabel(15)
            .elasticY(true)
            .yAxisPadding(1000)
            .maxBubbleRelativeSize(0.07)
            .renderHorizontalGridLines(true)
            .renderVerticalGridLines(true)
            .renderLabel(true)
            .renderTitle(true);
            // .title(function (p) {
            //     return p.key
            //         + "\n"
            //         + "Year : " + numberFormat(p.value.title_year) + "\n"
            //         + "Budget: " + numberFormat(p.value.budget);
            // }
            // );
        budget_per_country_chart.yAxis().tickFormat(function (s) {
            return s;
        });
        budget_per_country_chart.xAxis().tickFormat(function (s) {
            return s;
        });


      
            
            
                //-------------budget----------

            
        var budget_dim = ndx.dimension(function(d){
            if(d['budget'] >= 0 && d['budget'] <= 5000000)
                return "0-5M"
            else if(d['budget'] > 5000000 && d['budget'] <= 10000000)
                return "5M-10M"
            else if(d['budget'] > 10000000 && d['budget'] <= 25000000)
                return "10M-25M"
            else if(d['budget'] > 25000000 && d['budget'] <= 50000000)
                return "25M-50M"
            else if(d['budget'] > 50000000 && d['budget'] <= 80000000)
                return "50M-80M"
            else if(d['budget'] > 80000000 && d['budget'] <= 100000000)
                return "80M-100M"
            else 
                return "100M+"
        });
                            //-------------budget----------

        
        var budget_average = budget_dim.group();
        dc.barChart("#budget")
            .width(550)
            .height(300)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(budget_dim)
            .group(budget_average)
            .transitionDuration(500)
            .x(d3.scale.ordinal().domain(["0-5M","5M-10M", "10M-25M", "25M-50M", "50M-80M", "80M-100M", "100M+"]))
            .xUnits(dc.units.ordinal)
            .xAxisLabel("budget")
            .yAxis().ticks(4);
            
                    //-------------duration----------

       

        var duration_dim = ndx.dimension(function(d){
            if(d['duration'] >= 0 && d['duration'] <= 50)
                return "0-50"
            else if(d['duration'] > 50 && d['duration'] <= 90)
                return "50-90"
            else if(d['duration'] > 90 && d['duration'] <= 120)
                return "90-120"
            else if(d['duration'] > 120 && d['duration'] <= 140)
                return "120-140"
            else if(d['duration'] > 140 && d['duration'] <= 160)
                return "140-160"
            else if(d['duration'] > 160 && d['duration'] <= 180)
                return "160-180"
            else 
                return "180+"
        });
        
        // var duration_chart = duration_dim.group();
        // dc.barChart("#duration")
        //     .width(700)
        //     .height(400)
        //     .margins({top: 10, right: 50, bottom: 30, left: 50})
        //     .dimension(duration_dim)
        //     .group(duration_chart)
        //     .transitionDuration(500)
        //     .x(d3.scale.ordinal().domain(["0-50","50-90", "90-120", "120-140", "140-160", "160-180", "180+"]))
        //     .xUnits(dc.units.ordinal)
        //     .xAxisLabel("duration")
        //     .yAxis().ticks(4);
            
        // -------------- row chart --------------
        
        var dim = ndx.dimension(dc.pluck('country'));

        var group = dim.group()


        var chart = dc.rowChart("#top_countries");

        chart
            .width(450)
            .height(330)
            .dimension(dim)
            .group(group)
            .cap(5)
            .othersGrouper(false)
            .xAxis().ticks(4);
            
        
        // --------------world map--------------
        
                var countryDim = ndx.dimension(dc.pluck('country'));
        
        var country_group = countryDim.group();
        
        var worldMap = dc.geoChoroplethChart('#world-map-chart');
        
        var projection = d3.geo.mercator()
            .center([0, 5 ])
            .scale(100)
            .rotate([-50,0]);

        worldMap
            .width(1000)
            .height(420)
            .dimension(countryDim)
            .group(country_group)
            .colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#7C151D"])
            .colorDomain([0, 1])
            .overlayGeoJson(geoData["features"], "name", function (d) {
                return d.properties.name;
            })
            .projection(projection)
            .title(function(p){
                return "Country: " + p["Key"]
            })

        
        
        
        
      
    
    
    // --------------composite chart---------

            
    //   var parseDate = d3.time.format("%d/%m/%Y").parse;
    //     moviesData.forEach(function(d){
    //         d.date = parseDate(d.date);
    //     });
        
    //     var date_dim = ndx.dimension(dc.pluck('title_year'));
        
    //     var minDate = date_dim.bottom(1)[0].date;
    //     var maxDate = date_dim.top(1)[0].date;
        
    //     var productionUSA = country('USA');
    //     var productionUK = country('UK');
    //     var productionFrance = country('France');
    //     var productionChina = country('China');
    //     var productionAustralia = country('Australia');
    //     var productionIreland = country('Ireland');
    //     var productionCanada = country('Canada');

        
    //     function country (country) {
    //         return date_dim.group().reduceSum(function (d) {
    //         if (d.country === country) {
    //             return +d.country;
    //         } else {
    //             return 0;
    //         }
    //     });
    //     }
    //      var compositeChart = dc.compositeChart('#country');
    //     compositeChart
    //         .width(990)
    //         .height(200)
    //         .dimension(date_dim)
    //         .x(d3.time.scale().domain([minDate, maxDate]))
    //         .yAxisLabel("country")
    //         .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    //         .renderHorizontalGridLines(true)
    //         .compose([
    //             dc.lineChart(compositeChart)
    //                 .colors('green')
    //                 .group(productionUSA, 'USA'),
                
    //             dc.lineChart(compositeChart)
    //                 .colors('yellow')
    //                 .group(productionUK, 'UK'),
                
                
    //             dc.lineChart(compositeChart)
    //                 .colors('blue')
    //                 .group(productionFrance, 'France'),
                    
    //             dc.lineChart(compositeChart)
    //                 .colors('purple')
    //                 .group(productionChina, 'China'),
                    
    //             dc.lineChart(compositeChart)
    //                 .colors('red')
    //                 .group(productionAustralia, 'Australia'),
                    
    //             dc.lineChart(compositeChart)
    //                 .colors('pink')
    //                 .group(productionIreland, 'Ireland'),
                
    //             dc.lineChart(compositeChart)
    //                 .colors('orange')
    //                 .group(productionCanada, 'Canada')
    //         ])
    //         .brushOn(false)

            
        dc.renderAll();
    };
            