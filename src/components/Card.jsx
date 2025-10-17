import { motion } from 'framer-motion'

export default function PokemonCard({id, changeOrder, source, name }) {
    return (
        <div className="pokemon-container">
          <motion.div 
            className="pokemon-card" 
            data-id={id} 
            onClick={changeOrder} 
            style = {{backgroundImage:`url(${source})`}}
            // --- Framer Motion props ---
            initial={{ opacity: 0, scale: 0.8 }} //Αρχική κατάσταση πριν εμφανιστεί η κάρτα (μικρή και αόρατη)
            animate={{ opacity: 1, scale: 1 }} //Η κάρτα εμφανίζεται κανονικά με fade-in και scale-up
            exit={{ opacity: 0, scale: 0 }} //Όταν αφαιρείται, εξαφανίζεται με fade-out και scale-down
            transition={{ duration: 0.5, ease: "easeOut" }} //Ομαλή μετάβαση για όλα τα animation
            layout // Smooth animation όταν αλλάζει η θέση της κάρτας (π.χ. shuffle)
          />
          <p>{name}</p>
        </div>
        
    )
}