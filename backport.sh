# Commit local changes before! Possibly remove untracked, unneeded files afterwards
SRC=${1:-../ui/src}
cp $SRC/lib/*.ts src/lib/
cp $SRC/lib/ConnectionDetail.svelte src/lib/
cp $SRC/lib/ErrorMessage.svelte src/lib/
cp $SRC/lib/Route.svelte src/lib/
cp $SRC/lib/StopTimes.svelte src/lib/
cp -r $SRC/lib/components/ src/lib/components/