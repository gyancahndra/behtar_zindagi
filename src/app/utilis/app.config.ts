
import { environment } from "./../../environments/environment";

export const API_PATH = {
    statesList: environment.base_url + 'bz_FarmerApp/ProductDetail.svc/api/GetAllStateDistrictBlockVilage?apiKey=123&Id=0&Type=S',
    districtList: environment.base_url + 'bz_FarmerApp/ProductDetail.svc/api/GetAllStateDistrictBlockVilage?apiKey=123',
    bannersList: environment.base_url_test + 'api/Home/GetBZProductBanner?Version=1',
    farmerCategory: environment.base_url_test + 'api/Category/Get_MainCategory',
    topSellingProducts: environment.base_url_test + 'api/LiveStock/GetTrendsProducts?Version=1',
    behtarBachatProducts: environment.base_url_test + 'api/LiveStock/GetTodayOfferProduct?Version=1&CategoryId=',
    topBrands: environment.base_url_test + 'api/home/getbzappactivebrands?version=1',
    subCategories: environment.base_url_test + 'api/Category/Get_BZFarmerAppCatagory_New?version=1&KGP=1&Categoryid=',
    haryanaCategoryProduct: environment.base_url_test + 'api/LiveStock/GetCategoryWiseProducts?',
    getSubCategoriesProductsByCategoryId: environment.base_url_test + 'api/KitchenGarden/GetKGPCategorySubCategoryWiseDataV2',
    getSubCategoryFilter: environment.base_url_test + 'api/KitchenGarden/GetKGPCategoryFilters?Version=1&lang=E&KGP_CategoryId=',
    getProductDetails: environment.base_url_test + 'api/Home/v1/GetBzAppProductDetailsNew',
    getProductDetailsWithFarmerId: environment.base_url_test + 'api/Home/v1/GetBzAppProductDetailsByFarmerID',
    getOTP: environment.login_url + 'sendOTPToMobile',
    verifyOTP: environment.login_url + 'validateOTP',
    farmerAppLogin: environment.base_url + 'bz_FarmerApp/ProductDetail.svc/api/BZFarmerAPPLogin',
    getBestDeal: environment.base_url_test + 'api/Home/Insert_BuyerBestDealNotification',
    farmerAppServices: environment.base_url_test + 'api/LiveStock/BZFarmerAppServices?Version=1',
    orderCreate: environment.base_url_test + 'api/LiveStock/OrderCreate',
    GetBrandWiseProduct: environment.base_url_test + 'api/LiveStock/GetBrandWiseProduct',
    GetTodayOfferProduct: environment.base_url_test + 'api/LiveStock/GetTodayOfferProduct',
    getTrendsProduct: environment.base_url_test + 'api/LiveStock/GetTrendsProducts?Version=1',
    getPromoBanners: environment.base_url_test + 'api/Banner/v1/Get_SpecialBanner?'
} 

