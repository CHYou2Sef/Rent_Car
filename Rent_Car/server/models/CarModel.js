import mongoose from "mongoose";

const CarSchema = mongoose.Schema(
      {
          matricule : { 
              type: String ,
              require : true,
          },
          modele : { 
              type: String ,
              require : true,
          },
          categorie : { 
              type: String ,
              require : true,
          },
          etat : { 
              type: String ,
              require : true,
          },
      },
      {
          timestamps : true,
      }
  
);

export const Car = mongoose.model('Car', CarSchema);
