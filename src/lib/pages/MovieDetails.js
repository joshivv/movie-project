import { Lightning, Router } from "@lightningjs/sdk";
import { getMovieDetails, posterBaseUrl, getSimilarMovies } from "../MovieUtils";



export class MovieDetails extends Lightning.Component {
    static _template() {
        return {
                Background: {
                    rect: true,
                    w: 1280,
                    h: 1024,
                    color: 0xff000000
                },
                Details : {
                    visible: false,
                    Title: {
                        x: 50,
                        y: 200,
                        mountY: 0.5,
                        fontFace: "Regular",
                        color: 0xffffffff,
                        text: {
                            text: "Movie Title",
                            fontSize: 40,
                        }
                },
                Poster : {
                        w: 400,
                        h: 600,
                        x: 1280 - 400,
                        y: 70
                    //src:  default
                },

                ReleaseDate : {
                    x: 50,
                    y: 250,
                    mountY: 0.5,
                    color: 0xffff0000,
                    fontFace: "Regular",
                    text: {
                        text: "",
                        fontSize: 30,
                    }
                },

                Genres : {
                    x: 50,
                    y: 300,
                    mountY: 0.5,
                    color: 0xffff0000,
                    fontFace: "Regular",
                    text: {
                        text: "",
                        fontSize: 30,
                    }
                },

                Plot : {
                    x: 50,
                    y: 350,
                    w: 1240 - 400,
                    h: 300,
                    wrap: true,
                    color: 0xff00ff00,
                    fontFace: "Regular",
                    text: {
                        text: "Plot",
                        fontSize: 20,
                    }
                },

                SimilarMovies: {
                    x: 20,
                    y: 630,
                    w: 1240,
                    h: 300,
                    color: 0xffffffff,
                    fontFace: "Regular movies",
                    text: {
                        text: "Similar ",
                        fontSize: 30,
                    },
                flex: {
                    direction: 'row',
                    padding: 20,
                    wrap: false,
                },
            }
        }
    }
}

    async displayDetails () {
        let movie = await getMovieDetails (this.movieId);
        console.log ("details = " + movie.imdb_id + "title: " + movie.original_title)
        this.tag("Title").patch ({text: movie.original_title});
        this.tag("Poster").patch ({
                                    src: posterBaseUrl + movie.poster_path, 
                                });
        this.tag("ReleaseDate").patch ({
                                    text: movie.release_date + " | " + 
                                    movie.runtime + " mins" 
                                });

        this.tag("Genres").patch ({
                                text: "Genre: " + movie.genres.map((genre) => genre.name)
                                .join(", ")
                            });

        this.tag("Plot").patch ({text: "Plot: " + movie.overview});

        this.tag("Details").patch ({visible: true});

        let data = await getSimilarMovies (this.movieId);

        
        this.tag("SimilarMovies").children = data.results.slice(0, 5).map((item) => ({
            src: posterBaseUrl + item.poster_path,
            w: 180,
            h: 250,
            flexItem: {
                margin: 30,
            },
            Title: {
                x: w => w / 2,
                y: h => h + 15,
                mountX: 0.5,
                text: {
                    text: (item.original_title).substring (0,17) + ((item.original_title.length > 20) ? "..." : (item.original_title).substring (18,20)),
                    fontFace: 'Regular',
                    fontSize: 25,
                    textColor: 0xff22ff44,
                }
            }
        })) 
    }

    _handleBack ()
    {
        Router.navigate ('$');
    }

    set params(args) {
        console.log("Movie id- " + args.id);
        this.movieId = args.id;
        this.displayDetails ();
    }

    async _init () {
        console.log ("inside _init ()");
       // let movie = await getMovieDetails (this.movieId);
    }
}