<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Category;
use App\Models\Product;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::get();
        $product = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->orderBy('products.id', 'desc')
            ->paginate(6);
        return Inertia::render('Homepage', [
            'title' => 'Homepage',
            'product' => $product,  
            'category' => $category,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->qty = $request->qty;
        $product->category_id = $request->category;
        $product->save();
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, Category $category)
    {
        $categoryDD = $category->get();
        $myProduct = $product->with('category')->orderBy('id', 'desc')->get();

        return Inertia::render('Dashboard', [
            'myProduct' => $myProduct,
            'category' => $categoryDD
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product, Request $request, Category $category)
    {
        $categoryDD = $category->get();
        return Inertia::render('EditProduct', [
            'myProduct' => $product->find($request->id),
            'category' => $categoryDD
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        Product::where('id', $request->id)->update([
            'name' => $request->name,
            'qty' => $request->qty,
            'category_id' => $request->category,
        ]);
        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $product = Product::find($request->id);
        $product->delete();
        return redirect()->back();
    }

    public function search(Request $request)
    {
        $search = $request->search;
        $product = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->where('name', 'like', "%" . $search . "%")
            ->paginate(10);
        return Inertia::render('Homepage', [
            'product' => $product
        ]);
    }

    public function filterByCategoryId(Request $request)
    {
        $categoryId = $request->input('category_id');

        $products = Product::where('category_id', $categoryId)->get();

        return response()->json($products);
    }
}
