package controllers;

import play.mvc.*;

import views.html.*;

import javax.inject.Inject;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    private final AssetsFinder assetsFinder;

    @Inject
    public HomeController(AssetsFinder assetsFinder) {
        this.assetsFinder = assetsFinder;
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */


    public Result login(){
        return ok(
                login.render(assetsFinder)
        );
    }

    public Result createAccount(){
        return ok(
                createAccount.render("createAccount",assetsFinder)
        );
    }

    public Result forgotPassword(){
        return ok(
                forgotPassword.render("forgotPassword",assetsFinder)
        );
    }

    public Result home(){
        return ok(
                home.render("home",assetsFinder)
        );
    }

    public Result highscore(){
        return ok(
                highscore.render("highscore",assetsFinder)
        );
    }

    public Result profile(){
        return ok(
                profile.render("profile",assetsFinder)
        );
    }

    public Result defaultGame(){
        return ok(
                defaultGame.render("gameOne",assetsFinder)
        );
    }


    public Result gameLevelTwo(){
        return ok(
                gameLevelTwo.render("gameTwo",assetsFinder)
        );
    }

    public Result store(){
        return ok(
                store.render("Store",assetsFinder)
        );
    }

}
