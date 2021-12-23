function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

let renderItemHtml = (player) => {
    return `
    <div class="suggestion-sub--item">
        <div class="sub-item--label sub-item--label-${player.position.toLowerCase()}"></div>
        <div class="sub-item--postion">
            <span>${player.detail_position}</span>
        </div>
        <div class="sub-item--number">
            <span>${player.kit_number}</span>
        </div>
        <div class="sub-item--name">
            <span>${player.player_name}</span>
        </div>
    </div>
    `;
}

$.ajax({
    url: 'http://localhost:3001/coach/suggeted_lineup',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
        'auth-token': getCookie('auth-token'),
    },
    success: (data) => {
        const lineup = data.data;

        let defaultHtml = '';
        for(let i = 1; i < lineup.GK.length; i++) {
            defaultHtml += renderItemHtml(lineup.GK[i]);
        }
        for(let i = 2; i < lineup.CB.length; i++) {
            defaultHtml += renderItemHtml(lineup.CB[i]);
        }
        for(let i = 1; i < lineup.LB.length; i++) {
            defaultHtml += renderItemHtml(lineup.LB[i]);
        }
        for(let i = 1; i < lineup.RB.length; i++) {
            defaultHtml += renderItemHtml(lineup.RB[i]);
        }
        for(let i = 2; i < lineup.CM.length; i++) {
            defaultHtml += renderItemHtml(lineup.CM[i]);
        }
        for(let i = 1; i < lineup.RM.length; i++) {
            defaultHtml += renderItemHtml(lineup.RM[i]);
        }
        for(let i = 1; i < lineup.LM.length; i++) {
            defaultHtml += renderItemHtml(lineup.LM[i]);
        }
        for(let i = 1; i < lineup.CAM.length; i++) {
            defaultHtml += renderItemHtml(lineup.CAM[i]);
        }
        for(let i = 1; i < lineup.ST.length; i++) {
            defaultHtml += renderItemHtml(lineup.ST[i]);
        }

        $('.suggestion-sub--list').html(defaultHtml);

        $('#squad_4231').on('click', () => {
            
            $('.calculate-loading').addClass('loader--active');
        
            setTimeout(() => {
                // Multichoice
                $('#squad_4231').addClass('squad-choice--active');
                $('#squad_4141').removeClass('squad-choice--active');
                $('#squad_4222').removeClass('squad-choice--active');
                $('#squad_4132').removeClass('squad-choice--active');
                $('#squad_5122').removeClass('squad-choice--active');
        
                // Squad
                $('#squad-position--ls').addClass('squad-position--disabled');
                $('#squad-position--st').removeClass('squad-position--disabled');
                $('#squad-position--rs').addClass('squad-position--disabled');
                $('#squad-position--lm').removeClass('squad-position--disabled');
                $('#squad-position--lam').addClass('squad-position--disabled');
                $('#squad-position--cam').removeClass('squad-position--disabled');
                $('#squad-position--ram').addClass('squad-position--disabled');
                $('#squad-position--rm').removeClass('squad-position--disabled');
                $('#squad-position--lcm').removeClass('squad-position--disabled');
                $('#squad-position--cm').addClass('squad-position--disabled');
                $('#squad-position--rcm').removeClass('squad-position--disabled');
                $('#squad-position--lb').removeClass('squad-position--disabled');
                $('#squad-position--lcb').removeClass('squad-position--disabled');
                $('#squad-position--cb').addClass('squad-position--disabled');
                $('#squad-position--rcb').removeClass('squad-position--disabled');
                $('#squad-position--rb').removeClass('squad-position--disabled');

                // Subtitutions
                let html = '';

                for(let i = 1; i < lineup.GK.length; i++) {
                    html += renderItemHtml(lineup.GK[i]);
                }
                for(let i = 2; i < lineup.CB.length; i++) {
                    html += renderItemHtml(lineup.CB[i]);
                }
                for(let i = 1; i < lineup.LB.length; i++) {
                    html += renderItemHtml(lineup.LB[i]);
                }
                for(let i = 1; i < lineup.RB.length; i++) {
                    html += renderItemHtml(lineup.RB[i]);
                }
                for(let i = 2; i < lineup.CM.length; i++) {
                    html += renderItemHtml(lineup.CM[i]);
                }
                for(let i = 1; i < lineup.RM.length; i++) {
                    html += renderItemHtml(lineup.RM[i]);
                }
                for(let i = 1; i < lineup.LM.length; i++) {
                    html += renderItemHtml(lineup.LM[i]);
                }
                for(let i = 1; i < lineup.CAM.length; i++) {
                    html += renderItemHtml(lineup.CAM[i]);
                }
                for(let i = 1; i < lineup.ST.length; i++) {
                    html += renderItemHtml(lineup.ST[i]);
                }

                $('.suggestion-sub--list').html(html);
        
                $('.calculate-loading').removeClass('loader--active');
            }, 1000);
        });
        
        $('#squad_4141').on('click', () => {
        
            $('.calculate-loading').addClass('loader--active');
        
            setTimeout(() => {
                $('#squad_4231').removeClass('squad-choice--active');
                $('#squad_4141').addClass('squad-choice--active');
                $('#squad_4222').removeClass('squad-choice--active');
                $('#squad_4132').removeClass('squad-choice--active');
                $('#squad_5122').removeClass('squad-choice--active');
        
                // Squad
                $('#squad-position--ls').addClass('squad-position--disabled');
                $('#squad-position--st').removeClass('squad-position--disabled');
                $('#squad-position--rs').addClass('squad-position--disabled');
                $('#squad-position--lm').removeClass('squad-position--disabled');
                $('#squad-position--lam').removeClass('squad-position--disabled');
                $('#squad-position--cam').addClass('squad-position--disabled');
                $('#squad-position--ram').removeClass('squad-position--disabled');
                $('#squad-position--rm').removeClass('squad-position--disabled');
                $('#squad-position--lcm').addClass('squad-position--disabled');
                $('#squad-position--cm').removeClass('squad-position--disabled');
                $('#squad-position--rcm').addClass('squad-position--disabled');
                $('#squad-position--lb').removeClass('squad-position--disabled');
                $('#squad-position--lcb').removeClass('squad-position--disabled');
                $('#squad-position--cb').addClass('squad-position--disabled');
                $('#squad-position--rcb').removeClass('squad-position--disabled');
                $('#squad-position--rb').removeClass('squad-position--disabled');

                // Subtitutions
                let html = '';

                for(let i = 1; i < lineup.GK.length; i++) {
                    html += renderItemHtml(lineup.GK[i]);
                }
                for(let i = 2; i < lineup.CB.length; i++) {
                    html += renderItemHtml(lineup.CB[i]);
                }
                for(let i = 1; i < lineup.LB.length; i++) {
                    html += renderItemHtml(lineup.LB[i]);
                }
                for(let i = 1; i < lineup.RB.length; i++) {
                    html += renderItemHtml(lineup.RB[i]);
                }
                for(let i = 1; i < lineup.CM.length; i++) {
                    html += renderItemHtml(lineup.CM[i]);
                }
                for(let i = 1; i < lineup.RM.length; i++) {
                    html += renderItemHtml(lineup.RM[i]);
                }
                for(let i = 1; i < lineup.LM.length; i++) {
                    html += renderItemHtml(lineup.LM[i]);
                }
                for(let i = 2; i < lineup.CAM.length; i++) {
                    html += renderItemHtml(lineup.CAM[i]);
                }
                for(let i = 1; i < lineup.ST.length; i++) {
                    html += renderItemHtml(lineup.ST[i]);
                }

                $('.suggestion-sub--list').html(html);
        
                $('.calculate-loading').removeClass('loader--active');
            }, 1000);
        });
        
        $('#squad_4222').on('click', () => {
        
            $('.calculate-loading').addClass('loader--active');
        
            setTimeout(() => {
                $('#squad_4231').removeClass('squad-choice--active');
                $('#squad_4141').removeClass('squad-choice--active');
                $('#squad_4222').addClass('squad-choice--active');
                $('#squad_4132').removeClass('squad-choice--active');
                $('#squad_5122').removeClass('squad-choice--active');
        
                // Squad
                $('#squad-position--ls').removeClass('squad-position--disabled');
                $('#squad-position--st').addClass('squad-position--disabled');
                $('#squad-position--rs').removeClass('squad-position--disabled');
                $('#squad-position--lm').addClass('squad-position--disabled');
                $('#squad-position--lam').removeClass('squad-position--disabled');
                $('#squad-position--cam').addClass('squad-position--disabled');
                $('#squad-position--ram').removeClass('squad-position--disabled');
                $('#squad-position--rm').addClass('squad-position--disabled');
                $('#squad-position--lcm').removeClass('squad-position--disabled');
                $('#squad-position--cm').addClass('squad-position--disabled');
                $('#squad-position--rcm').removeClass('squad-position--disabled');
                $('#squad-position--lb').removeClass('squad-position--disabled');
                $('#squad-position--lcb').removeClass('squad-position--disabled');
                $('#squad-position--cb').addClass('squad-position--disabled');
                $('#squad-position--rcb').removeClass('squad-position--disabled');
                $('#squad-position--rb').removeClass('squad-position--disabled');

                // Subtitutions
                let html = '';

                for(let i = 1; i < lineup.GK.length; i++) {
                    html += renderItemHtml(lineup.GK[i]);
                }
                for(let i = 2; i < lineup.CB.length; i++) {
                    html += renderItemHtml(lineup.CB[i]);
                }
                for(let i = 1; i < lineup.LB.length; i++) {
                    html += renderItemHtml(lineup.LB[i]);
                }
                for(let i = 1; i < lineup.RB.length; i++) {
                    html += renderItemHtml(lineup.RB[i]);
                }
                for(let i = 2; i < lineup.CM.length; i++) {
                    html += renderItemHtml(lineup.CM[i]);
                }
                for(let i = 0; i < lineup.RM.length; i++) {
                    html += renderItemHtml(lineup.RM[i]);
                }
                for(let i = 0; i < lineup.LM.length; i++) {
                    html += renderItemHtml(lineup.LM[i]);
                }
                for(let i = 2; i < lineup.CAM.length; i++) {
                    html += renderItemHtml(lineup.CAM[i]);
                }
                for(let i = 2; i < lineup.ST.length; i++) {
                    html += renderItemHtml(lineup.ST[i]);
                }

                $('.suggestion-sub--list').html(html);

                $('.calculate-loading').removeClass('loader--active');
            }, 1000);
        })
        
        $('#squad_4132').on('click', () => {
        
            $('.calculate-loading').addClass('loader--active');
        
            setTimeout(() => {
                $('#squad_4231').removeClass('squad-choice--active');
                $('#squad_4141').removeClass('squad-choice--active');
                $('#squad_4222').removeClass('squad-choice--active');
                $('#squad_4132').addClass('squad-choice--active');
                $('#squad_5122').removeClass('squad-choice--active');
        
                // Squad
                $('#squad-position--ls').removeClass('squad-position--disabled');
                $('#squad-position--st').addClass('squad-position--disabled');
                $('#squad-position--rs').removeClass('squad-position--disabled');
                $('#squad-position--lm').removeClass('squad-position--disabled');
                $('#squad-position--lam').addClass('squad-position--disabled');
                $('#squad-position--cam').removeClass('squad-position--disabled');
                $('#squad-position--ram').addClass('squad-position--disabled');
                $('#squad-position--rm').removeClass('squad-position--disabled');
                $('#squad-position--lcm').addClass('squad-position--disabled');
                $('#squad-position--cm').removeClass('squad-position--disabled');
                $('#squad-position--rcm').addClass('squad-position--disabled');
                $('#squad-position--lb').removeClass('squad-position--disabled');
                $('#squad-position--lcb').removeClass('squad-position--disabled');
                $('#squad-position--cb').addClass('squad-position--disabled');
                $('#squad-position--rcb').removeClass('squad-position--disabled');
                $('#squad-position--rb').removeClass('squad-position--disabled');

                // Subtitutions
                let html = '';

                for(let i = 1; i < lineup.GK.length; i++) {
                    html += renderItemHtml(lineup.GK[i]);
                }
                for(let i = 2; i < lineup.CB.length; i++) {
                    html += renderItemHtml(lineup.CB[i]);
                }
                for(let i = 1; i < lineup.LB.length; i++) {
                    html += renderItemHtml(lineup.LB[i]);
                }
                for(let i = 1; i < lineup.RB.length; i++) {
                    html += renderItemHtml(lineup.RB[i]);
                }
                for(let i = 1; i < lineup.CM.length; i++) {
                    html += renderItemHtml(lineup.CM[i]);
                }
                for(let i = 1; i < lineup.RM.length; i++) {
                    html += renderItemHtml(lineup.RM[i]);
                }
                for(let i = 1; i < lineup.LM.length; i++) {
                    html += renderItemHtml(lineup.LM[i]);
                }
                for(let i = 1; i < lineup.CAM.length; i++) {
                    html += renderItemHtml(lineup.CAM[i]);
                }
                for(let i = 2; i < lineup.ST.length; i++) {
                    html += renderItemHtml(lineup.ST[i]);
                }

                $('.suggestion-sub--list').html(html);

                $('.calculate-loading').removeClass('loader--active');
            }, 1000);
        })
        
        $('#squad_5122').on('click', () => {
        
            $('.calculate-loading').addClass('loader--active');
        
            setTimeout(() => {
                $('#squad_4231').removeClass('squad-choice--active');
                $('#squad_4141').removeClass('squad-choice--active');
                $('#squad_4222').removeClass('squad-choice--active');
                $('#squad_4132').removeClass('squad-choice--active');
                $('#squad_5122').addClass('squad-choice--active');
        
                // Squad
                $('#squad-position--ls').removeClass('squad-position--disabled');
                $('#squad-position--st').addClass('squad-position--disabled');
                $('#squad-position--rs').removeClass('squad-position--disabled');
                $('#squad-position--lm').addClass('squad-position--disabled');
                $('#squad-position--lam').removeClass('squad-position--disabled');
                $('#squad-position--cam').addClass('squad-position--disabled');
                $('#squad-position--ram').removeClass('squad-position--disabled');
                $('#squad-position--rm').addClass('squad-position--disabled');
                $('#squad-position--lcm').addClass('squad-position--disabled');
                $('#squad-position--cm').removeClass('squad-position--disabled');
                $('#squad-position--rcm').addClass('squad-position--disabled');
                $('#squad-position--lb').removeClass('squad-position--disabled');
                $('#squad-position--lcb').removeClass('squad-position--disabled');
                $('#squad-position--cb').removeClass('squad-position--disabled');
                $('#squad-position--rcb').removeClass('squad-position--disabled');
                $('#squad-position--rb').removeClass('squad-position--disabled');

                // Subtitutions
                let html = '';

                for(let i = 1; i < lineup.GK.length; i++) {
                    html += renderItemHtml(lineup.GK[i]);
                }
                for(let i = 3; i < lineup.CB.length; i++) {
                    html += renderItemHtml(lineup.CB[i]);
                }
                for(let i = 1; i < lineup.LB.length; i++) {
                    html += renderItemHtml(lineup.LB[i]);
                }
                for(let i = 1; i < lineup.RB.length; i++) {
                    html += renderItemHtml(lineup.RB[i]);
                }
                for(let i = 1; i < lineup.CM.length; i++) {
                    html += renderItemHtml(lineup.CM[i]);
                }
                for(let i = 0; i < lineup.RM.length; i++) {
                    html += renderItemHtml(lineup.RM[i]);
                }
                for(let i = 0; i < lineup.LM.length; i++) {
                    html += renderItemHtml(lineup.LM[i]);
                }
                for(let i = 2; i < lineup.CAM.length; i++) {
                    html += renderItemHtml(lineup.CAM[i]);
                }
                for(let i = 2; i < lineup.ST.length; i++) {
                    html += renderItemHtml(lineup.ST[i]);
                }

                $('.suggestion-sub--list').html(html);

                $('.calculate-loading').removeClass('loader--active');
            }, 1000);
        })
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
    }
})
