(function ($) {
   "use strict";
   
//   Pace.on("start", function () {
//      $("#preloader").show();
//   });
//   
   $(document).on("ready", function () {
      
//      $('#status').fadeOut(); // will first fade out the loading animation
//      $('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website.
      setTimeout(checkForm, 1000);

      setTimeout(function () {
         new WOW().init();
      }, 1000);

      if ($('#coundown-holder').length > 0) {
         // Initiate Countdown
         $('#coundown-holder').countDown({
            targetDate: {
               'day': 1,
               'month': 1,
               'year': 2025,
               'hour': 0,
               'min': 0,
               'sec': 0
            },
            omitWeeks: true
         });
      }

      function getImgSize(el, imgSrc) {
         var newImg = new Image();
         newImg.onload = function () {
            var height = newImg.height;
            var width = newImg.width;

            el.css('height', height);

         };
         newImg.src = imgSrc;
      }

      $('footer nav a').on('click', function (e) {
         e.preventDefault();
         var pageID = $(this).attr('href');
         $('footer nav .active').removeClass('active');
         $(this).addClass('active');
         $('.page.active').removeClass('active');
         $(pageID).addClass('active');
      });

      if ($('.bg-image[data-bg-image]').length > 0) {
         $('.bg-image[data-bg-image]').each(function () {
            var el = $(this);
            var sz = getImgSize(el, el.attr("data-bg-image"));
            el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-bg-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');
         });
      }

      $('[data-placeholder]').on('focus', function () {
         var input = $(this);
         if (input.val() === input.attr('data-placeholder')) {
            input.val('');
         }
      }).on('blur', function () {
         var input = $(this);
         if (input.val() === '' || input.val() === input.attr('data-placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('data-placeholder'));
         }
      }).blur();

      $('[data-placeholder]').parents('form').submit(function () {
         $(this).find('[data-placeholder]').each(function () {
            var input = $(this);
            if (input.val() === input.attr('data-placeholder')) {
               input.val('');
            }
         });
      });

      function checkForm() {
         if ($(".form-holder").length > 0) {

            var formStatus = $(".form-holder form").validate();

            //   ===================================================== 
            //sending contact form
            $(".form-holder form").on('submit', function (e) {
               e.preventDefault();

               //  triggers contact form validation

               if (formStatus.errorList.length === 0)
               {
                  $(".form-holder form").fadeOut(function () {
                     $('#loading').css('visibility', 'visible');
                     $.post('submit.php', $(".form-holder form").serialize(),
                             function (data) {

                                $('.message-box').html(data);


                                $('#loading').css('visibility', 'hidden');

                             }

                     );
                  });


               }

            });
         }
      }

   // Function to simulate rising stock prices
   function simulateRisingStockPrices(n_days, initial_price = 20, volatility = 0.02, trend = 0.001) {
      let stock_prices = [initial_price];
      let top_prices = [initial_price];
      let stop_prices = [initial_price * 0.8];

      for (let i = 1; i < n_days; i++) {
         let daily_return = Math.random() * volatility * 2 - volatility + trend;
         let new_price = stock_prices[stock_prices.length - 1] * (1 + daily_return);

         if (new_price > stop_prices[stop_prices.length - 1]) {
            stock_prices.push(new_price);
         } else {
            stock_prices.push(stock_prices[stock_prices.length - 1]);
         }

         if (new_price > top_prices[top_prices.length - 1]) {
            top_prices.push(new_price);
            stop_prices.push(new_price * 0.8);
         } else {
            top_prices.push(top_prices[top_prices.length - 1]);
            stop_prices.push(stop_prices[stop_prices.length - 1]);
         }
      }

      return stock_prices;
   }
 
   // Function to simulate fluctuating stock prices with a decent overall downward trend
   function simulateFluctuatingStockPrices(n_days, initial_price = 20, volatility = 0.03, trend = -0.0005) {
      let stock_prices = [initial_price];

      for (let i = 1; i < n_days; i++) {
         let daily_return = Math.random() * volatility * 2 - volatility + trend;
         let new_price = stock_prices[stock_prices.length - 1] * (1 + daily_return);
         stock_prices.push(new_price);
      }

      return stock_prices;
   }

   // Function to initialize the ECharts chart
   function initializeChart(data, totalTime) {
      var chartDom = document.getElementById('chart-container');
      if (chartDom) {
      var myChart = echarts.init(chartDom);
   
      // Calculate min and max values for yAxis
      var allValues = data.rising.concat(data.fluctuating);
      var minValue = Math.min(...allValues);
      var maxValue = Math.max(...allValues);
   
      var option = {
         title: {
         },
         tooltip: {
            trigger: 'axis',
            show: false // Disable tooltip
         },
         legend: {
            data: ['Price Prediction Based on the ERC-100 Protocol', 'Price Prediction Not Based on the ERC-100 Protocol'],
            textStyle: {
               color: '#C0C0C0' // Silver white color for the legend
            },
            show: false // Disable tooltip
         },
         xAxis: {
            type: 'category',
            data: Array.from({ length: data.rising.length }, (_, i) => i + 1), // Set full x-axis data
            boundaryGap: false,
            axisLabel: {
               color: '#C0C0C0', // Silver white color for x-axis labels
               show: false // Show x-axis labels
            },
            axisLine: {
               show: true, // Show y-axis line
               lineStyle: {
                  color: '#C0C0C0' // Silver white color for x-axis line
               }
            }
         },
         yAxis: {
            type: 'value',
            min: minValue - (maxValue - minValue) * 0.1, // Add some padding
            max: maxValue + (maxValue - minValue) * 0.1, // Add some padding
            axisLabel: {
            color: '#C0C0C0', // Silver white color for y-axis labels
            show: false // Hide y-axis labels
            },
            axisLine: {
               show: true, // Show y-axis line
               lineStyle: {
                  color: '#C0C0C0' // Silver white color for y-axis line
               }
            },
            axisTick: {
               show: true // Show y-axis ticks
            },
            splitLine: {
               show: false // Remove horizontal grid lines
            }
         },
         series: [
            {
               name: 'Price Prediction Based on the ERC-100 Protocol',
               type: 'line',
               data: [],
               itemStyle: {
                  color: '#5470C6' // Color for the first line
               }
            },
            {
               name: 'Price Prediction Not Based on the ERC-100 Protocol',
               type: 'line',
               data: [],
               itemStyle: {
                  color: '#EE6666' // Color for the second line
               }
            }
         ]
      };
      myChart.setOption(option);
   
      // Animation logic
      let index = 0;
      const intervalTime = totalTime / data.rising.length;
   
      function startAnimation() {
         const interval = setInterval(() => {
            if (index < data.rising.length) {
               myChart.setOption({
                  series: [
                     {
                        name: 'Price Prediction Based on the ERC-100 Protocol',
                        data: data.rising.slice(0, index + 1)
                     },
                     {
                        name: 'Price Prediction Not Based on the ERC-100 Protocol',
                        data: data.fluctuating.slice(0, index + 1)
                     }
                  ]
               });
               index++;
            } else {
               clearInterval(interval);
               setTimeout(() => {
                  index = 0;
                  myChart.setOption({
                     series: [
                     {
                        name: 'Price Prediction Based on the ERC-100 Protocol',
                        data: []
                     },
                     {
                        name: 'Price Prediction Not Based on the ERC-100 Protocol',
                        data: []
                     }
                     ]
                  });
                  startAnimation(); // Restart the animation
               }, 2000); // Wait for 2 seconds before resetting
            }
         }, intervalTime); // Calculate the interval time based on total time
      }
   
      startAnimation();
   
      // Toggle visibility based on checkbox selection
      document.getElementById('toggleBitcoin').addEventListener('change', function () {
         const isVisible = this.checked;
         myChart.setOption({
            series: [
            {
               name: 'Price Prediction Based on the ERC-100 Protocol',
               itemStyle: { opacity: isVisible ? 1 : 0 }, // Toggle visibility by opacity
               lineStyle: { opacity: isVisible ? 1 : 0 },  // Toggle visibility of the line itself
               symbolSize: isVisible ? 4 : 0 // Toggle visibility of the points (symbols)
            }
            ]
         });
      });
   
      document.getElementById('toggleDogecoin').addEventListener('change', function () {
         const isVisible = this.checked;
         myChart.setOption({
            series: [
               {
                  name: 'Price Prediction Not Based on the ERC-100 Protocol',
                  itemStyle: { opacity: isVisible ? 1 : 0 }, // Toggle visibility by opacity
                  lineStyle: { opacity: isVisible ? 1 : 0 },  // Toggle visibility of the line itself
                  symbolSize: isVisible ? 4 : 0 // Toggle visibility of the points (symbols)
               }
            ]
         });
      });

      return myChart;
      } else {
         console.error('Chart container not found');
         return null;
      }
   }

   // Initialize the ECharts chart when the "#price-table" link is clicked
   var myChart;
   $('a[href="#price-table"]').on('click', function (e) {
      e.preventDefault();
      // Hide other sections and show price-table section
      $('.page').removeClass('active').css('z-index', 1);
      $('#price-table').addClass('active').css('z-index', 10);

      // Hide the countdown holder
      $('#coundown-holder').slideUp();

      // Simulate data
      const n_days = 400;
      const rising_prices = simulateRisingStockPrices(n_days);
      const fluctuating_prices = simulateFluctuatingStockPrices(n_days);

      const data = {
         rising: rising_prices,
         fluctuating: fluctuating_prices
      };

      myChart = initializeChart(data, 0);
   });
   
   // Restore the countdown holder when other tabs are clicked
   $('a[href!="#price-table"]').on('click', function (e) {
      e.preventDefault();
      // Restore the countdown holder
      $('#coundown-holder').slideDown();
   });

   // Handle window resize event
   $(window).resize(function () {
      if (myChart) {
         myChart.resize();
      }
   });
   });
})(jQuery);
