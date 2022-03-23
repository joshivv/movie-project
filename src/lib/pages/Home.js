import { Lightning, Router } from "@lightningjs/sdk";
import { getMovies, posterBaseUrl } from "../MovieUtils";



export class Home extends Lightning.Component {
    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff000000
            },

            Heading: {
                x: 1920 / 2,
                y: 10,
                mountX: 0.5,
                color: 0xffffff00,
                text: {
                    text: "Upcoming Movies",
                    fontSize: 50,
                }
            },

            MainPage: {
                y: 80,
                Thumbnails: {
                    rect: true,
                    w: 1920,
                    h: 1080 - 50,
                    color: 0xff808080,
                    flex: {
                        direction: 'row',
                        padding: 20,
                        wrap: true,
                    },

                    /*
                    Item1: { w: 200, h: 300, flexItem: { margin: 10 }, rect: true, color: 0xFFA7A7A7 },
                    Item2: {
                        w: 200,
                        h: 300,
                        src: ('https://image.tmdb.org/t/p/w500/1s0em1CVrM1e6fsafiNePXqh6Hv.jpg'),
                        flexItem: {
                            margin: 10,
                        },

                    },
                    Item3: { w: 200, h: 300, flexItem: { margin: 10 }, rect: true, color: 0xFFA7A7A7 },

                    children: [
                        { flexItem:{ margin: 10 }, w: 200, h: 300, src: ('https://image.tmdb.org/t/p/w500/1s0em1CVrM1e6fsafiNePXqh6Hv.jpg'),},
                        { flexItem:{ margin: 10 }, w: 200, h: 300, src: ('https://image.tmdb.org/t/p/w500/1s0em1CVrM1e6fsafiNePXqh6Hv.jpg'),}
                    ]*/

                }
            }
        }
    }

    _handleEnter () {
        let movieId = this.tag ("Thumbnails").children[this.currentFocusedItem].movieId;
        Router.navigate ("movie/" + movieId);
        
    }

    _handleRight () {
        //console.log ("_handleRight Stopping animation for " + this.currentFocusedItem);
        this.animate (this.currentFocusedItem, false);

        if (this.currentFocusedItem < this.count - 1) {
            this.currentFocusedItem++;
        }
        //console.log ("_handleRight Starting animation for " + this.currentFocusedItem);
        this.animate (this.currentFocusedItem, true);
    }

    _handleLeft () {
        //console.log ("_handleLeft Stopping animation for " + this.currentFocusedItem);
        this.animate (this.currentFocusedItem, false);
        if (this.currentFocusedItem > 0) {
            this.currentFocusedItem--;
        }
        //console.log ("_handleLeft Starting animation for " + this.currentFocusedItem);
        this.animate (this.currentFocusedItem, true);
    }

    animate (index, startStop)
    {
        if (startStop)
        {
            //console.log ("Start animation for index:" + index);
            /*this._focusAnimation = */this.tag ("Thumbnails").children[index].animation({
            duration: 0.2,
            actions: [
            { p: "scale", v: { 0: 1, 1: 1.15 } },
            ],
            }).start ();
        }
        else
        {
            //console.log ("Stop animation for index:" + index);
            this.tag ("Thumbnails").children[index].animation({
                duration: 0.2,
                actions: [
                { p: "scale", v: { 0: 1, 1: 0.85 } },
                ],
                }).start ();
        }
    }

    async _init() {
        let data = await getMovies("upcoming");
        this.count = data.results.length;
        this.index = 0;
        this.currentFocusedItem = 0;

        console.log ("Total movies: " +  this.count);
        this.tag("Thumbnails").children = data.results.map((item, index) => ({
            src: posterBaseUrl + item.poster_path,
            w: 180,
            h: 250,
            movieId: item.id,
            position: index + 1,
            flexItem: {
                margin: 30,
            },
            Title: {
                x: w => w / 2,
                y: h => h + 5,
                mountX: 0.5,
                text: {
                    text: (item.original_title).substring (0,17) + ((item.original_title.length > 20) ? "..." : (item.original_title).substring (18,20)),
                    fontFace: 'Regular',
                    fontSize: 20,
                    textColor: 0xff22ff44,
                }
            }
        }))

        this.animate (this.currentFocusedItem);

        
        // data.results.map((movie) => {
        //     console.log ("title = " + movie.original_title);
        //     if (movie.original_title === "The Bad Guys"){
        //         this.tag ("Item2").patch ({
        //             src: ('https://image.tmdb.org/t/p/w500/lrP1TQf3stZveNEyviUUcSh8HLA.jpg'),
        //         })
        //     }

        //     movies.push (movie);
        // })

        // for (item in movies)
        // {
        //     this.tag ("Thumbnails").children = {
        //     flexItem: { margin: 10 }, 
        //     w: 200, 
        //     h: 300,
        //     src: ('https://image.tmdb.org/t/p/w500/' + item.poster_path),
        // }
    }


}

