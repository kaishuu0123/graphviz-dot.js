PREFIX_LITE = $(abspath ./prefix-lite)
BUILD_LITE = $(abspath ./build-lite)

EXPAT_VERSION = 2.1.0
GRAPHVIZ_VERSION = 2.40.1

viz-lite.js: src/boilerplate/pre-lite.js $(BUILD_LITE)/module.js src/api.js src/boilerplate/post.js
	sed -e s/{{VIZ_VERSION}}/$(VIZ_VERSION)/ -e s/{{GRAPHVIZ_VERSION}}/$(GRAPHVIZ_VERSION)/ -e s/{{EMSCRIPTEN_VERSION}}/$(EMSCRIPTEN_VERSION)/ $^ > $@

$(BUILD_LITE)/module.js: src/viz.c
	emcc -D VIZ_LITE -Oz --memory-init-file 0 -s USE_ZLIB=1 -s MODULARIZE=1 -s NO_DYNAMIC_EXECUTION=1 -s EXPORTED_FUNCTIONS="['_vizRenderFromString', '_vizCreateFile', '_vizLastErrorMessage', '_dtextract', '_Dtqueue', '_dtopen', '_dtdisc', '_Dtobag', '_Dtoset', '_Dttree']" -s EXPORTED_RUNTIME_METHODS="['Pointer_stringify', 'ccall', 'UTF8ToString']" -o $@ $< -I$(PREFIX_LITE)/include -I$(PREFIX_LITE)/include/graphviz -L$(PREFIX_LITE)/lib -L$(PREFIX_LITE)/lib/graphviz -lgvplugin_core -lgvplugin_dot_layout -lcdt -lcgraph -lgvc -lgvpr -lpathplan -lxdot

expat: | $(BUILD)/expat-$(EXPAT_VERSION) $(PREFIX)
	cd $(BUILD)/expat-$(EXPAT_VERSION) && emconfigure ./configure --disable-shared --prefix=$(PREFIX) CFLAGS="-Oz"
	cd $(BUILD)/expat-$(EXPAT_VERSION) && emmake make buildlib installlib

$(PREFIX_LITE):
	mkdir -p $(PREFIX_LITE)

graphviz-lite: | $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION) $(PREFIX_LITE)
	cd $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION) && ./configure
	cd $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION)/lib/gvpr && make mkdefs
	mkdir -p $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION)/FEATURE
	cp hacks/FEATURE/sfio hacks/FEATURE/vmalloc $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION)/FEATURE
	cd $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION) && emconfigure ./configure --disable-ltdl --enable-static --disable-shared --prefix=$(PREFIX_LITE) CFLAGS="-Oz -Wno-implicit-function-declaration"
	cd $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION) && emmake make lib plugin
	cd $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION)/lib && emmake make install
	cd $(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION)/plugin && emmake make install

$(BUILD_LITE):
	mkdir -p $(BUILD_LITE)

$(BUILD_LITE)/graphviz-$(GRAPHVIZ_VERSION): sources/graphviz-2.40.1.tar.gz | $(BUILD_LITE)
	tar -zxf sources/graphviz-2.40.1.tar.gz -C $(BUILD_LITE)


sources:
	mkdir -p sources

sources/expat-$(EXPAT_VERSION).tar.gz: | sources
	curl -L "http://sourceforge.net/projects/expat/files/expat/2.1.0/expat-$(EXPAT_VERSION).tar.gz/download" -o sources/expat-$(EXPAT_VERSION).tar.gz

sources/graphviz-2.40.1.tar.gz: | sources
	curl -L "https://graphviz.gitlab.io/pub/graphviz/stable/SOURCES/graphviz-2.40.1.tar.gz" -o sources/graphviz-2.40.1.tar.gz
