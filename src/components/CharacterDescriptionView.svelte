<script lang='ts'>
	import SkillBar from "./SkillBar.svelte";

    const name = "Character Name";
    const description = "Lorem Ipsum et cosa bidule chouette. Lorem Ipsum et cosa bidule chouette. Lorem Ipsum et cosa bidule chouette";
    const imagePath = "MushroomPlaceholder.jpg";
    const life = 20;
    const maxLife = 30;
    const energy = 80;
    const maxEnergy = 100;
    const images: any = import.meta.glob(['$lib/assets/images/characterpfp/**.jpg', '$lib/assets/images/characterpfp/**.png'], { eager: true, as: 'url' });
    
    let strength:  number = 20;
    let dexterity:  number = 20;
    let stealth:    number = 40;
    let stamina:    number = 20;
    let manufacturing:  number = 80;
    let perception: number = 20;
    let intelligence:   number = 60;
    let initimidation:  number = 20;
    let haggling:   number = 20;
    let charisma:   number = 20;
    
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
    <div class="grid grid-cols-[3fr_2fr] gap-4">
        <div class="pt-5">
            <SkillBar name="Force" value={strength} color="error"/>
            <SkillBar name="Dextérité" value={dexterity} color="error"/>
            <SkillBar name="Discrétion" value={stealth} color="success"/>
            <SkillBar name="Endurance" value={stamina} color="success"/>
            <SkillBar name="Manufacture" value={manufacturing} color="info"/>
            <SkillBar name="Perception" value={perception} color="info"/>
            <SkillBar name="Intelligence" value={intelligence} color="info"/>
            <SkillBar name="Intimidation" value={initimidation} color="warning"/>
            <SkillBar name="Marchandage" value={haggling} color="warning"/>
            <SkillBar name="Charisme" value={charisma} color="warning"/>
        </div>
        <div>
            <h3 class="pb-1">Vie</h3>
            <div class="radial-progress bg-base-300 text-error border-base-300 border-4" style={`--value:${life*100/maxLife};`} aria-valuenow={life} role="progressbar">{life}/{maxLife}</div>
            
            <h3 class="pt-4 pb-1">Energie</h3>
            <div class="radial-progress bg-base-300 text-info border-base-300 border-4" style={`--value:${energy*100/maxEnergy};`} aria-valuenow={energy} role="progressbar">{energy}/{maxEnergy}</div>
        </div>
    </div>
    
</div>