top = "."
out = "build"


def configure(ctx):
    ctx.find_program("coffee", var="COFFEE")
    ctx.env.ARGS = "-co"


def build(ctx):
    for file in ctx.glob("src/*.coffee"):
        ctx(name   = "coffee",
            rule   = "${COFFEE} ${ARGS} default ${SRC}",
            target = file[4:-6] + "js",
            source = file)
