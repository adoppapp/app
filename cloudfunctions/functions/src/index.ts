import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// import { User } from './models/user';


const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.consultausuario  = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // your function body here - use the provided req and res from cors
        // let usuario : User;
        let uid: any;

        uid = req.query.uid;
        admin.auth().getUser(uid)
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                res.send(userRecord.toJSON())
                console.log('Successfully fetched user data:', userRecord.toJSON());
            })
            .catch(function (error) {
                res.send("usuario no encontrado" + uid)
                console.log('Error fetching user data:', error);
            });
    })
}
)
// tslint:disable-next-line:no-empty
export const creadorsolicitud = functions.firestore.document('/solicitudes/{uid}/solicitudes/{aviso}').onCreate((Snapshot, Context) => {
    const uid = Context.params.uid;
    const aviso = Context.params.aviso;
    console.log ( 'el usuario ' + uid + ' solicito el aviso ' + aviso );
    db.collection("solicitudesxavisos").doc(aviso).collection("usuarios").doc(uid).set({
        uid: uid,
        estado: 'activa',
    })
        .then(function () {
            console.log("Document successfully written!");
            return true;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
            return false
        });
})

export const estadosolicitud = functions.firestore.document('/solicitudesxavisos/{aviso}/usuarios/{uid}').onUpdate((Snapshot, Context) => {
    const uid = Context.params.uid;
    const aviso = Context.params.aviso;
    const nuevoestado = Snapshot.after.data().estado;
    db.collection("solicitudes").doc(uid).collection("solicitudes").doc(aviso).set({
        aviso: aviso,
        estado: nuevoestado ,
    })
        .then(function () {
            console.log("Document successfully written!");
            return true;
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
            return false
        });
    console.log('se cambio el estado de solicide del usuario ' + uid + ' del aviso  ' + aviso + ' el nuevo estado es :' + nuevoestado);
    return true;
})
