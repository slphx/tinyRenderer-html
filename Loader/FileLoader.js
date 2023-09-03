import { Cache } from "./Cache.js";
import { Loader } from "./Loader.js";

const loading = {};

class FileLoader extends Loader {

    load(url, onLoad){
        if ( url === undefined ) url = '';
        if ( this.path !== undefined ) url = this.path + url;

        const cached = Cache.get( url );

        if ( cached !== undefined ) {
			setTimeout( () => {
				if ( onLoad ) onLoad( cached );
			}, 0 );

			return cached;
		}

        if (loading[url] !== undefined){
            loading[url].push({
                onLoad: onLoad
            });
            return;
        }

        loading[url] = [];
        loading[url].push({
            onLoad: onLoad
        })

        const req = new Request(url);
        const mimeType = this.mimeType;
		const responseType = this.responseType;

        fetch( req )
            .then(response => {
                console.log('FileType:', responseType);

                switch ( responseType ) {
					case 'arraybuffer':
						return response.arrayBuffer();

					case 'blob':
						return response.blob();

					case 'document':
						return response.text()
							.then( text => {

								const parser = new DOMParser();
								return parser.parseFromString( text, mimeType );

							} );

					case 'json':
						return response.json();

					default:
						if ( mimeType === undefined ) {
							return response.text();

						} else {
							// sniff encoding
							const re = /charset="?([^;"\s]*)"?/i;
							const exec = re.exec( mimeType );
							const label = exec && exec[ 1 ] ? exec[ 1 ].toLowerCase() : undefined;
							const decoder = new TextDecoder( label );
							return response.arrayBuffer().then( ab => decoder.decode( ab ) );
						}

				}
            })
            .then(data => {
                Cache.add(url, data);
				const callbacks = loading[ url ];
				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {
					const callback = callbacks[ i ];
					if ( callback.onLoad ) callback.onLoad( data );
				}
            });
    }

    setResponseType( value ) {
		this.responseType = value;
		return this;
	}

	setMimeType( value ) {
		this.mimeType = value;
		return this;
	}
}

export { FileLoader };