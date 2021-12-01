document.addEventListener("DOMContentLoaded", function() {

   const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";
   
   fetch(url)
      .then(resp => resp.json())
      .then(data => {
         
         var scheme_group = document.getElementsByClassName('scheme-group')[0];

         for(let i in data){
            var h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(data[i].title));

            var scheme = document.createElement('section');
            scheme.setAttribute('class', 'scheme');
            
            var preview = document.createElement('div');
            preview.setAttribute('class', 'preview');

            for(let j in data[i].scheme){
               var color_box = document.createElement('div');
               color_box.setAttribute('class', 'color-box');
               let r = data[i].scheme[j].color.red;
               let g = data[i].scheme[j].color.green;
               let b = data[i].scheme[j].color.blue;
               let set_color = 'background-color: rgb(' + r + ',' + g + ',' + b + ')';  
               color_box.setAttribute('style', set_color);
               
               preview.appendChild(color_box);
            }

            var button = document.createElement('button');
            button.setAttribute('id', data[i].id);
            button.appendChild(document.createTextNode('View'));
            var actions = document.createElement('div');
            actions.setAttribute('class', 'actions');
            actions.appendChild(button);

            scheme.appendChild(preview);
            scheme.appendChild(actions);

            scheme_group.appendChild(h3);
            scheme_group.appendChild(scheme);
         }


         document.addEventListener('click', (e) => {
            console.log(e.target.id); //test

            var aside = document.getElementsByTagName('aside')[0];
            aside.innerHTML = '';

            // appear lds-ring (loading screen)
            var lds_ring = document.createElement('div');
            lds_ring.setAttribute('id', 'loader');
            lds_ring.setAttribute('class', 'lds-ring');
            for(let i = 0; i < 4; i++){
               lds_ring.appendChild(document.createElement('div'));
            }

            aside.appendChild(lds_ring);

            function look_for_this_scheme(this_scheme){
               for(let j in data){
                  if(this_scheme == data[j].id){
                     return data[j];
                  }
               }
            }

            var present_this_scheme = look_for_this_scheme(e.target.id);
            console.log(present_this_scheme); //test

            var h2_title = document.createElement('h2');
            h2_title.appendChild(document.createTextNode(present_this_scheme.title));

            var fieldset = document.createElement('fieldset');
            var colorRow = document.createElement('div');
            colorRow.setAttribute('class', 'colorRow');
            for(let j in present_this_scheme.scheme){
               var detailBox = document.createElement('div');
               detailBox.setAttribute('class', 'detailBox');
               let bc = 'background-color:' + present_this_scheme.scheme[j].web;
               detailBox.setAttribute('style', bc);

               var span_color_web = document.createElement('span');
               span_color_web.appendChild(document.createTextNode(present_this_scheme.scheme[j].web));

               var span_color_rgb = document.createElement('span');
               let str_rgb = 'rgb(' + present_this_scheme.scheme[j].color.red + ',' 
                                    + present_this_scheme.scheme[j].color.green + ','
                                    + present_this_scheme.scheme[j].color.blue + ')'; 
               span_color_rgb.appendChild(document.createTextNode(str_rgb));

               var label = document.createElement('label');
               label.appendChild(document.createTextNode(present_this_scheme.scheme[j].name));

               colorRow.appendChild(detailBox);
               colorRow.appendChild(span_color_web);
               colorRow.appendChild(span_color_rgb);
               colorRow.appendChild(label);
            }

            fieldset.appendChild(colorRow);

            // hide lds-ring (loading screen)
            //for(let i = 0; i < 1000000000; i++);
            lds_ring.setAttribute('style', 'visibility: hidden');            

            aside.appendChild(h2_title);
            aside.appendChild(fieldset);
         });

      });

});



 
