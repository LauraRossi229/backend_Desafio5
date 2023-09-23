import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionRouter = Router()

// Ruta para mostrar el formulario de inicio de sesión
sessionRouter.get('/login', (req, res) => {
    res.render('login', { successMessage: 'Loguearse' }); // Renderiza la vista de inicio de sesión
});

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        if (req.session.login) {
            return res.status(200).render('login', { errorMessage: 'Usuario Logueado, cierre sesión y vuelva a ingresar' });
  
        }
        const user = await userModel.findOne({ email: email })

        if (user) {
            if (user.password == password) {
                req.session.login = true
                const userData = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                };
                //res.render('products', { userData }); // Redirecciona al usuario a la vista de productos
              return  res.redirect(`/products?first_name=${userData.first_name}&last_name=${userData.last_name}&email=${userData.email}`);
            } else {
                //res.status(401).send({ resultado: 'Contaseña no valida', message: password })
               return res.status(401).render('login', { errorMessage: 'Contraseña no válida' });
            }
        } else {
            //res.status(404).send({ resultado: 'Not Found', message: user })
            return res.status(404).render('login', { errorMessage: 'Usuario no encontrado' });
        }

    } catch (error) {
        //res.status(400).send({ error: `Error en Login: ${error}` })
        return res.status(400).render('login', { errorMessage: `Error en el inicio de sesión: ${error}` });
    }
})

sessionRouter.post('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).send('Error interno del servidor');
            } else {
                res.redirect('/api/sessions/login'); // Redirecciona al usuario a la página de inicio de sesión
            }
        });
    } else {
        res.redirect('/api/sessions/login'); // Si el usuario no estaba logueado, redirecciona a la página de inicio de sesión
    }
});
export default sessionRouter