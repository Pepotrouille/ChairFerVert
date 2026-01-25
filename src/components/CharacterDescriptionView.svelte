<script lang='ts'>
    const name = "Character Name";
    const description = "Lorem Ipsum et cosa bidule chouette. Lorem Ipsum et cosa bidule chouette. Lorem Ipsum et cosa bidule chouette";
    const imagePath = "MushroomPlaceholder.jpg";
    const life = 20;
    const maxLife = 30;
    const energy = 80;
    const maxEnergy = 100;
    const images: any = import.meta.glob(['$lib/assets/images/characterpfp/**.jpg', '$lib/assets/images/characterpfp/**.png'], { eager: true, as: 'url' });
    console.log(images)
</script>

<div>
    <div class="grid grid-cols-[1fr_5fr] gap-4 h-35">
        <div class="avatar h-full p-2">
            <div class="rounded h-full">
                <img src={images[`/src/lib/assets/images/characterpfp/${imagePath}`]} alt="The guy's head"/>
            </div>
        </div>
        <div class="flex items-center">
            <h2 class="text-left w-full">{name}</h2>
        </div>
    </div>
    <p class="p-5 text-left">{description}</p>
    <div class="radial-progress bg-base-300 text-rose-400 border-base-300 border-4" style={`--value:${life*100/maxLife};`} aria-valuenow={life} role="progressbar">{life}/{maxLife}</div>
    <div class="radial-progress bg-base-300 text-sky-400 border-base-300 border-4" style={`--value:${energy*100/maxEnergy};`} aria-valuenow={energy} role="progressbar">{energy}/{maxEnergy}</div>
</div>